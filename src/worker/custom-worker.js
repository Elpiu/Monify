// src/custom-worker.js

/**
 * Funzione di simulazione di un calcolo lento e asincrono.
 * @param {number} duration - Durata in millisecondi per la simulazione del calcolo.
 * @returns {Promise<number>} - Promessa che risolve con un risultato fittizio.
 */
function simulateSlowComputation(duration) {
  // Simula un lungo calcolo bloccante (ad esempio un loop) o un'attesa asincrona.
  console.log(`[SW] Inizio calcolo lento per ${duration / 1000} secondi.`);

  return new Promise((resolve) => {
    // Usiamo setTimeout per simulare un'operazione che richiede tempo
    // senza bloccare il Service Worker stesso.
    setTimeout(() => {
      // Risultato del calcolo
      const result = Math.floor(Math.random() * 1000000);
      console.log(`[SW] Calcolo terminato. Risultato: ${result}`);
      resolve(result);
    }, duration);
  });
}

// 1. Intercettare i messaggi dal thread principale (App Angular)
self.addEventListener('message', (event) => {
  const { type, data } = event.data;

  // Verificare che il messaggio sia quello atteso per il calcolo
  if (type === 'START_SLOW_COMPUTATION') {
    const duration = data.duration || 5000; // Durata di default 5 secondi

    // Impedisce al Service Worker di entrare in uno stato inattivo prima di finire.
    // Il Service Worker rimarrà "sveglio" fino a quando la Promessa non si risolve.
    event.waitUntil(
      simulateSlowComputation(duration)
        .then((result) => {
          // 2. Inviare il risultato all'App Angular
          console.log(`[SW] Invio messaggio al client con il risultato.`);

          event.source.postMessage({
            type: 'COMPUTATION_COMPLETE',
            result: result,
            message: `Il calcolo lento è terminato dopo ${duration / 1000} secondi!`,
          });
        })
        .catch((error) => {
          // Gestione degli errori
          event.source.postMessage({
            type: 'COMPUTATION_ERROR',
            error: error.message,
          });
        })
    );
  }
});

// Ascolto per l'evento di installazione (opzionale, per logging)
self.addEventListener('install', (event) => {
  console.log('[Custom SW] Installato.');
});

// Ascolto per l'evento di attivazione (opzionale, per logging)
self.addEventListener('activate', (event) => {
  console.log('[Custom SW] Attivato.');
});
