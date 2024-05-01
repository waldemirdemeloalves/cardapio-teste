/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    _fontFamily: {
      'sans': ['Inter', 'sans-serif']
    },
    get fontFamily() {
      return this._fontFamily;
    },
    set fontFamily(value) {
      this._fontFamily = value;
    },
    extend: {
      /*backgroundImage:{
        "home": "url('/assets/bg.png')"
      },*/
    },
  },
  plugins: [],
}

