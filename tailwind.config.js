/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out forwards",
        slideOut: "slideOut 0.3s ease-in forwards",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      fontSize: {
      'xs': '10px',
      'sm': '12px',
      "m":'14px',
      "l":'16px',
      "xl":'18px',
      'custom-large': '22px', // Custom font size
      "xxl":"24px",
      "3xl":'26px'
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    colors: {
      customBlue: '#151B23', // Custom blue
      customGray: '#797979', // Custom gray
      customGrad1:'#1761D800',
      customGrad2:'#1761D833',
      customGrey1:'#F3F4F4',
      blueBg:'#1761D81A',
      borderGrey:'#ebebeb',
      buttonBLue:"#1761D8",
      buttonBlueOpacity:"#1761D80F",
      red:"#E03636"
    },
  },
  screens: {
    sm: '640px',
    md: '768px',  // Tablets
    lg: '1024px', // Laptops
    xl: '1280px',
  },
  },
  plugins: [],
}
