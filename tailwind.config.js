/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
  darkMode: ['class', '[class="app-dark"]'],

  content: [
    './src/**/*.{html,ts,scss,css}',
    //'./libs/**/*.{html,ts,scss,css}',
    './index.html',
    // Se hai altri file nella root del workspace che contengono classi Tailwind, aggiungili qui:
    // './src/**/*.{html,ts,scss,css}', // Se il tuo progetto root ha una cartella 'src'
  ],

  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1920px',
      },
    },
  },

  plugins: [PrimeUI],
};
