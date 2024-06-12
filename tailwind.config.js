/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        'header' : '88px',
        'footer' : '44px',
      },
      fontFamily: {
        'Hegante': ['hegante', 'sans-serif'],
        'comfortaa' : ['Comfortaa', 'sans-serif'],
        'sniglet' : ['Sniglet', 'sans-serif']
      },
      colors: {
        'mainBlue' : "#1F8389",
        'mainOrange' : "#FFAB6F",
        'lightOrange' : "#FFD9AD",
        'lightBeige' : "#FFF1E7",
        'grayDark' : "#625B66",
        'dark' : '#342E37',
        'mainGreen': '#49B06C',
        'mainRed': '#FB5D83',
      },
      boxShadow: {
        'inner-orange': 'inset 0px -6px 0px #FFAB6F',
      },
    }
  },
  plugins: []
}
