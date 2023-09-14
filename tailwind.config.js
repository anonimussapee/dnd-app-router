/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens : {
      smMax : {'max':'750px'},
      ss : { 'min' : '600px'},
      sm : { 'min' : '751px'}
    },
    extend: {},
  },
  plugins: [],
}