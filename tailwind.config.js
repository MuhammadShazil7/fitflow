/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#1a1a2e',
          100: '#16213e',
          200: '#0f3460',
          300: '#0a0a1a',
          400: '#050510',
          500: '#02020a',
          600: '#000000',
        },
        neon: {
          50: '#d4f5d4',
          100: '#a8eba8',
          200: '#7ce07c',
          300: '#50d650',
          400: '#24cb24',
          500: '#00ff00',
          600: '#00e600',
          700: '#00cc00',
          800: '#00b300',
          900: '#009900',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 0, 0.3), 0 0 60px rgba(0, 255, 0, 0.1)',
        'neon-lg': '0 0 40px rgba(0, 255, 0, 0.4), 0 0 80px rgba(0, 255, 0, 0.15)',
        'neon-xl': '0 0 60px rgba(0, 255, 0, 0.5), 0 0 120px rgba(0, 255, 0, 0.2)',
        'dark': '0 20px 60px rgba(0, 0, 0, 0.5)',
        'dark-lg': '0 30px 80px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}