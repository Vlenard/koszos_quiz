/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "darkGrey": "#303030",
        "grey": "#505050",
        "fblue": "#0095ff",
        "lightText": "#aaaaaa"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

