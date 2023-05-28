/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        darkPrimary : "#4848BF",
        primary : '#6060D8',
        lightPrimary : '#949AF2',
        textColor : '#474747',
        lightText: '#8E8B8B',
        lightPink : '#FBF6FA',
        lightBlue : '#E3F0F8',
        shadow : '#BCCBFF',
        tileColor: '#E9F0F7',
      },boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

