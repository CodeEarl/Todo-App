/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: ["./dist/**/*.{html,js}"],

  theme: {
    extend: {
      colors: {
        "vlg": "#fafafa",
        "vlgb": "#e4e5f1",
        "lgb": "#d2d3db",
        "dgb": "#9394a5",
        "vdgb": "#484b6a",

        "lg": "#57ddff",
        "lg2": "#c058f3",

        "dvdb": "#161722",
        "dvdbb": "#25273c",
        "dlgb": "#cacde8",
        "dlgbh": "#e4e5f1",
        "ddgb": "#777a92",
        "dvdgb": "#4d5066",
        "dvdgbb": "#393a4c",
      },
    },
  },

  plugins: [],
}

