module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'blockbtn':'0px 3px 0px',
        sh1:'0px 10px 34px rgba(0, 0, 0, 0.06)',
        footer:'0px -5px 24px rgba(0, 0, 0, 0.1)'
      },
      colors:{
        primary:{
          700:'#0180CF',
          500:"#0097FD",
          300:'#0BBFFE'
        },
        dark01:'#010228',
        gray01:'#D5D4DB',
        gray02:'#8B8CA7',
        gray03:'#747592',
        gray04:"#B6B6B6"
      }
    },
  },
  plugins: [],
}