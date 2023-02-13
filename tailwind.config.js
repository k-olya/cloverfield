/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        "105": "1.05",
        "110": "1.1"
      },
      colors: {
        "special-green": "#65a21b",
        "special-green-2": "#8bc02b"
      }
    },
  },
  plugins: [],
}
