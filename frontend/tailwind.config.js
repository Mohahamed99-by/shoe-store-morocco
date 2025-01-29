/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#faf3e0',
          500: '#d4af37',
          600: '#c4a032',
        },
      },
    },
  },
  plugins: [],
}