/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        "110": "1.1"
      },
      colors: {
        "special-green": "#65a21b",
        "special-green-2": "#8bc02b"
      },
      keyframes: {
        float: {
          '0%': { transform: 'rotate(45deg) translate(0, 0)' },
          '100%': { transform: 'rotate(45deg) translate(0%, -40%)' },
        }
      },
      animation: {
        float: 'float 20s linear infinite',
      }
    },
  },
  plugins: [],
}
