/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#01223c',
          medium: '#052f65',
          light: '#0f3a66'
        },
        accent: {
          gold: '#f6b914',
          'gold-dark': '#d19d0a'
        },
        text: {
          primary: '#1e2f4f',
          muted: '#546e8f',
          light: '#f5f8ff'
        },
        bg: {
          main: '#f5f8ff',
          section: '#f0f4fb',
          dark: '#01213a'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '10px',
      },
      boxShadow: {
        md: '0 8px 20px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
