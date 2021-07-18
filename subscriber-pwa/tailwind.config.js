module.exports = {
  important: true,
  //Purging for Production is configured in PostCSS Config
  purge: {
    content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  },

  theme: {
    fontFamily: {
      // display: ['Poppins', 'sans-serif'],
      // body: ['Montserrat', 'sans-serif'],
    },
    colors: {
      primary: {
        700: "hsl(124, 38%, 61%)", // #78C27D
      },
      secondary: {},
      dark: {
        900: "#000000",
      },
      light: {
        100: "#ffffff",
      },
      transparent: {
        900: "rgba(1,1,1,0)",
      },
    },
    extend: {
      gridTemplateColumns: {
        18: "repeat(18,minmax(0,1fr))",
      },
      gridColumnEnd: {
        19: "19",
      },
    },
  },
  variants: {},
  plugins: [
    function ({ addBase, theme }) {
      // this function essentially adds all the colors mentioned above as css variables in the code
      // which can be very helpful
      // https://gist.github.com/Merott/d2a19b32db07565e94f10d13d11a8574

      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === "string"
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};
