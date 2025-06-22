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
  }
},
  plugins: [],
}
