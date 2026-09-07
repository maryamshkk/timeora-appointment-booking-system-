/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        navy: "#000C1E",
        slate: "#43474E",
        white: "#FFFFFF",
        gray: "#C3C6CF",
        beige: "#E4E2DD",
        gold: "#FED488",
      },

      fontFamily: {
        serif: ["Libre Caslon", "serif"],
      },
    },
  },

  plugins: [],
};