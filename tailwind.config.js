// tailwind.config.js

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E96B74",
        secondary: "#F8DCDC",
        main: "#FFF5F5",
      },
      fontFamily: {
        montreg: ["Montserrat-Regular", "sans-serif"],
        montmed: ["Montserrat-Medium", "sans-serif"],
        montSemi: ["Montserrat-SemiBold", "sans-serif"],
        montBold: ["Montserrat-Bold", "sans-serif"],
        kaushan: ["KaushanScript-Regular", "cursive"],
      },
    },
  },
  plugins: [],
};
