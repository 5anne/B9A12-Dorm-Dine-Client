/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: 'Roboto, sans-serif',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

