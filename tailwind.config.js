/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
      'xs': '10px',
      'sm': '12px',
      "m":'14px',
      "l":'16px',
      'custom-large': '22px', // Custom font size
    },
      fontWeight: {
      extrathin: '50',  // Custom weight
      'custom-thin':'100',
      'custom-medium':'200',
      'custom-semibold':'300',
      'custom-regular':'400',
      'custom-bold':'500',
      superbold: '950', // Custom weight
    },
    colors: {
      customBlue: '#151B23', // Custom blue
      customGray: '#797979', // Custom gray
      customGrad1:'#1761D800',
      customGrad2:'#1761D833',
    },
  },
    
  },
  plugins: [],
}
