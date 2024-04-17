/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', '../src/dist/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        hero: 'url("/assets/images/hero.webp")',
        about: 'url("/assets/images/about.webp")'
      },
    },
    fontFamily: {
      'dmSans': ['DM Sans', 'sans-serif'],
      'bondiMono': ['Bodoni Moda', ' serif']
    }
  },
  plugins: [],
};
