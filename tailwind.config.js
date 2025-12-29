/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'boho-primary': '#8B5A2B',
        'boho-dark': '#4A3B32',
        'boho-bg': '#FAF9F6',
        'boho-gray': '#F5F5F5',
      },
    },
  },
  plugins: [],
}