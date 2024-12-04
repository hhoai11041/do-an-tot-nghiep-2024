/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      mobile: "300px",
      tablet: "640px",
      // laptop: "1024px",
      desktop: "1280px",
      screenLarge: "1800px",
    },

    extend: {
      backgroundColor: {
        bgThemeUI: "#101214",
        bgFooter: "#3B3C41",
        bgPrimary: "#ff5b00",
        // bgPrimary: "green",
      },
      textColor: {
        textThemeUI: "#ffffff",
        textPrimary: "#ff5b00",
        // textPrimary: "green",
      },
      width: {
        screenWidth: "90%",
      },
      fontFamily: {
        lobster: ["Lobster", "cursive"],
      },
    },
  },
  plugins: [],
};
