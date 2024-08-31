/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'leftNav': '#61AB3D',
        'mainChat': '#DCF7C5'
      }
    },
  },
  plugins: [],
}