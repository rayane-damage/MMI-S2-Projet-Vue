/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mainBlue' : "#1F8389",
        'mainOrange' : "#FFAB6F"
      },
      boxShadow: {
        'inner-orange': 'inset 0px -6px 0px #FFAB6F',
      },
    }
  },
  plugins: []
}
