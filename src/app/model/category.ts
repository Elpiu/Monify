

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  type: 'expense' | 'income';
}


export const defaultCategories: Category[] = [
  {
    id: 1,
    name: "Casa e Utenze",
    description: "Affitto, mutuo, bollette (luce, gas, acqua), manutenzione casa.",
    icon: "home-2",
    type: "expense",
  },
  {
    id: 2,
    name: "Alimentari e Spesa",
    description: "Acquisti al supermercato, drogheria e generi alimentari.",
    icon: "shopping-cart",
    type: "expense",
  },
  {
    id: 3,
    name: "Trasporti",
    description: "Carburante, biglietti mezzi pubblici, taxi, manutenzione auto, abbonamenti.",
    icon: "car",
    type: "expense",
  },
  {
    id: 4,
    name: "Ristoranti e Bar",
    description: "Uscite per mangiare fuori, caffè, bevande e take-away.",
    icon: "cup",
    type: "expense",
  },
  {
    id: 5,
    name: "Salute e Benessere",
    description: "Farmaci, visite mediche, palestra, prodotti per la cura personale.",
    icon: "heartbeat",
    type: "expense",
  },
  {
    id: 6,
    name: "Intrattenimento",
    description: "Cinema, concerti, hobby, abbonamenti streaming (Netflix, Spotify).",
    icon: "palette",
    type: "expense",
  },
  {
    id: 7,
    name: "Abbigliamento e Cura",
    description: "Vestiti, scarpe, accessori, lavanderia.",
    icon: "hanger",
    type: "expense",
  },
  {
    id: 8,
    name: "Viaggi",
    description: "Biglietti aerei/treno, alloggi, spese durante le vacanze.",
    icon: "plane",
    type: "expense",
  },
  {
    id: 9,
    name: "Istruzione",
    description: "Libri, corsi, tasse universitarie, materiale scolastico.",
    icon: "book",
    type: "expense",
  },
  {
    id: 10,
    name: "Regali e Donazioni",
    description: "Regali per compleanni, festività e beneficenza.",
    icon: "gift",
    type: "expense",
  },
  {
    id: 11,
    name: "Tasse e Imposte",
    description: "Tasse governative, IMU, bollo auto, ecc.",
    icon: "scale",
    type: "expense",
  },
  {
    id: 12,
    name: "Spese Varie",
    description: "Spese non facilmente classificabili nelle altre categorie.",
    icon: "dots",
    type: "expense",
  },

  {
    id: 13,
    name: "Stipendio",
    description: "Salario regolare dal datore di lavoro.",
    icon: "wallet",
    type: "income",
  },
  {
    id: 14,
    name: "Lavoro Extra",
    description: "Entrate da lavori occasionali, freelance o secondari.",
    icon: "briefcase",
    type: "income",
  },
  {
    id: 15,
    name: "Investimenti",
    description: "Dividendi, interessi, guadagni dalla vendita di titoli.",
    icon: "chart-line",
    type: "income",
  },
  {
    id: 16,
    name: "Regali Ricevuti",
    description: "Somme di denaro ricevute come regalo.",
    icon: "coin",
    type: "income",
  },
  {
    id: 17,
    name: "Rimborsi",
    description: "Soldi restituiti (es. da un reso, assicurazione, ecc.).",
    icon: "receipt-refund",
    type: "income",
  },
];
