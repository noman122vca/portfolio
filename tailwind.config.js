/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#020B0E',
        surface: '#071A22',
        cyan: {
          glow: '#00E5FF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '"Hind Siliguri"', 'sans-serif'],
        bengali: ['"Hind Siliguri"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
