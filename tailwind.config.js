const defaultColors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
    colors: {
      ...defaultColors,
      primary: "#5D71E1",
      redPink: "#FA3154",
    },
  },
  plugins: [],
};
