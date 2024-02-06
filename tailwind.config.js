/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontsize: {
      xss: ['8px', '10px'],
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily:{
        inter: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        'primary': '#0000FF',
        'green': '#04A551',
        'red': '#FFEEC5',
        'light-black': '#FFEEC5',
        'grey-bg': '#EFEFEF',
        'grey': '#828282',
        'sidebar-bg': '#252628',
        'active':"#FF0000"
      },
      boxShadow: {
          '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)',
          'shadow-1':'0 0 20px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [],
}