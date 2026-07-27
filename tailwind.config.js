const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    colors: {
      darkBG: "#17171B",
      lightBG: "#E5E5E5",
      darkText: "#ffffff",
      lightText: "#212529",
      ...colors,
    },
    extend: {},
  },
  plugins: [],
};
