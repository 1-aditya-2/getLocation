/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:"jit",
  darkMode:"class",
  content: ["./popup.tsx"],
  theme: {
    extend: {
      colors:{
        'green':'#1abc9c',
        'dark-green':'#16a085',
        'grey':'#d2d9dd',
        'blue':'#0080C9',
        'dark-blue':'#005AC7',
        'brown':'#4D3322'
      },
    },
  },
  plugins: [],
}

