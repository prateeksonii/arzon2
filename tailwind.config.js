/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        head: "Gilroy, Inter, sans-serif",
        sans: "Inter, sans-serif",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
