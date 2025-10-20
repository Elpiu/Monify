// index.js
const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs-extra");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" })); // accetta svg nel body
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const PUBLIC_DIR = path.resolve(__dirname, "public");
const STORE_FILE = path.resolve(__dirname, "store.json");
const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

fs.ensureDirSync(PUBLIC_DIR);
if (!fs.existsSync(STORE_FILE)) fs.writeJsonSync(STORE_FILE, {});

/** helper: salva mapping store */
async function saveMapping(mapping) {
  const store = await fs.readJson(STORE_FILE);
  store[mapping.id] = mapping;
  await fs.writeJson(STORE_FILE, store, { spaces: 2 });
}

/** helper: get mapping by id */
async function getMapping(id) {
  const store = await fs.readJson(STORE_FILE);
  return store[id];
}

/**
 * POST /generate
 * - accetta upload multipart field 'file' (svg) oppure JSON { svg: "<svg...>" }
 * - restituisce { name: "noify", results: { "72": "id", ... } }
 */
app.post("/generate", upload.single("file"), async (req, res) => {
  try {
    let svgBuffer;
    if (req.file) {
      svgBuffer = req.file.buffer;
    } else if (req.body.svg) {
      svgBuffer = Buffer.from(req.body.svg, "utf8");
    } else {
      return res.status(400).json({
        error:
          'Nessun SVG fornito. Invia file multipart "file" o JSON { svg: "..." }',
      });
    }

    const batchId = uuidv4();
    const results = {};

    // generiamo i PNG per tutte le dimensioni
    await Promise.all(
      SIZES.map(async (size) => {
        const fileId = uuidv4();
        const filename = `icon-${size}x${size}.png`;
        const outPath = path.join(PUBLIC_DIR, filename);

        // sharp: rasterizza SVG e ridimensiona (fit: contain)
        await sharp(svgBuffer)
          .resize(size, size, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png()
          .toFile(outPath);

        // salviamo mapping per questo fileId
        const mapping = {
          id: fileId,
          filename,
          size,
          batchId,
          createdAt: new Date().toISOString(),
        };
        await saveMapping(mapping);

        results[size] = fileId; // id di download per questa dimensione
      })
    );

    return res.json({
      batchId,
      sizes: SIZES,
      results, // es. { "72": "<id>", "96": "<id>", ... }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Errore nella generazione immagini",
      details: err.message,
    });
  }
});

/** Scarico file per id */
app.get("/download/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const mapping = await getMapping(id);
    if (!mapping) return res.status(404).json({ error: "File non trovato" });
    const filePath = path.join(PUBLIC_DIR, mapping.filename);
    if (!fs.existsSync(filePath))
      return res.status(404).json({ error: "File non trovato sul disco" });
    res.download(filePath, `noify_${mapping.size}.png`);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Errore nel download", details: err.message });
  }
});

/** Endpoint opzionale per listare mapping di un batch */
app.get("/batch/:batchId", async (req, res) => {
  try {
    const batchId = req.params.batchId;
    const store = await fs.readJson(STORE_FILE);
    const results = Object.values(store).filter((x) => x.batchId === batchId);
    res.json({ batchId, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Icon service running on http://localhost:${PORT}`)
);
