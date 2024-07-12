/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7047EB',
        gray: {
          darkgray: '#2B2B33',
          lightgray: "#F1F1F4",
          primary: "#A8A8AB"
        },
        secondary: {
          red: '#F53D6B',
          yellow: '#FFC233',
          green: "#2DCA72"
        }
      },
      fontFamily: {
        body: ['Roboto']
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
}