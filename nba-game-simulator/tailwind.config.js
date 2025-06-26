/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
  extend: {
    colors: {
      secondary: '#000000',
      primary: '#FFD700',
      base: '#FFFFFF',
      metallic: '#B8860B',
      grayText: '#CCCCCC',
    },
    fontFamily: {
        display: ['"Oswald"', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      boxShadow: {
        gold: '0 4px 12px rgba(255, 215, 0, 0.4)',
      },
      animation: {
  fadeIn: 'fadeIn 1.5s ease-out forwards',
  fadeUp: 'fadeUp 0.6s ease-out forwards',
},
keyframes: {
  fadeIn: {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  fadeUp: {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },}
  }
},
  plugins: [],
}
