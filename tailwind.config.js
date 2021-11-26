// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        orange: colors.orange
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      opacity: ['disabled']
    }
  },
  plugins: []
}
