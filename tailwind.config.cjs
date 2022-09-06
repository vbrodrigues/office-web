/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
        body: "Roboto, sans-serif",
        title: "Poppins, sans-serif",
      },
    },
  },
  plugins: [],
};
