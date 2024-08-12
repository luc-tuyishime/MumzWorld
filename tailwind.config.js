/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'mumz-pink': '#ED1971',
        'mumz-blue': '#00B7E5',
        'mumz-green': '#B4D433',
        'mumz-yellow': '#FFCB00',
        'mumz-light-gray': '#F5F5F5',
        'mumz-dark-gray': '#333333'
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
};
