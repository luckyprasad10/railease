/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        railway: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#38a5f6',
          500: '#0e87ea',
          600: '#026ac8',
          700: '#0354a2',
          800: '#074785',
          900: '#0c3c6f',
          950: '#08264a',
        },
        saffron: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'train-glide': 'trainGlide 2.5s ease-in-out infinite',
      },
      keyframes: {
        trainGlide: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(6px)' },
        }
      }
    },
  },
  plugins: [],
}
