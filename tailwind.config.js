/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },

      colors: {
        main: "#4CB7A5",
        sub: "#B3EAE1",
        accent: "#FB373E",

        gray: {
          900: "#1B1B1B",
          800: "#5F5F5F",
          700: "#9A9A9A",
          600: "#BABABA",
          500: "#DBDBDB",
          100: "#F0F0F0",
          50: "#FEFEFE",
        },
      },

      fontSize: {
        15: "15px",
        16: "16px",
        20: "20px",
        24: "24px",
        32: "32px",
        36: "36px",
        40: "40px",
        48: "48px",
      },

      fontWeight: {
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
};
