/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#006C36',
          light: '#009955',
          lighter: '#00CC73',
          lightest: '#00FF91',
          dark: '#004D2A',
          darker: '#003320',
        },
        neutral: {
          white: '#FFFFFF',
          black: '#000000',
          gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
          },
        },
        status: {
          success: '#00FF91',
          error: '#FF006E',
          warning: '#FFD60A',
          info: '#009955',
        },
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-sm': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-lg': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-hover': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [],
} 