/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
    './error.vue',

  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        spin: 'spin 1.5s linear infinite',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}