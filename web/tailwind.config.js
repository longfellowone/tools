const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      width: {
        // 88: "22rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
}
