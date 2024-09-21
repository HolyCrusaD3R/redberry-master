export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        firaGo: ['FiraGo', 'sans-sarif'],
        helveticaNeue: ['Helvetica Neue', 'sans-sarif'],
      },
      colors: {
        customBlack: '##1A1A1F',
        customBlueLight: '#021526B2',
        customBlue: '#021526',
        customGray: '#2D3648',
        customGrayAlt: '#808A93',
        customGreen: '#45A849',
        customRed: '#F93B1D',
        customRedAlt: '#DF3014',
      },
    },
  },
  plugins: [],
}
