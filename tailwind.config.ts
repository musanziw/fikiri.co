/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', '../src/dist/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        hero: 'url("/assets/images/hero.webp")',
        about: 'url("/assets/images/about.jpeg")',
      },
    },
  },
  plugins: [],
};
