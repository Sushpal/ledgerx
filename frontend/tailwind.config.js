/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cream": "#f0ede8",
        "warm-grey": "#8a8480",
        "gold": "#c8a96e",
        "dark-bg": "#151515",
        "card-bg": "#1a1a1a",
        "border-subtle": "#272727",
      }
    },
  },
  plugins: [],
}