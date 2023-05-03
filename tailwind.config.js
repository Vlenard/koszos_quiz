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
        "hfblue": "#2ba7ff",
        "lightText": "#aaaaaa"
      }, 
      boxShadow: {
        "light-box-shadow": "0px 0px 10px 0px rgba(100, 100, 100, 0.5)"
      },
    },
  },
  plugins: [
  ],
}

