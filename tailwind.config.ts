/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', '../src/dist/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        hero: 'url("/assets/images/hero.webp")',
        about: 'url("/assets/images/about.webp")',
        footer: 'url("/assets/images/footer.png")',
      },
    },
    animation: {
      'infinite-scroll': 'infinite-scroll 25s linear infinite',
    },
    keyframes: {
      'infinite-scroll': {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(-100%)' },
      }
    },
    fontFamily: {
      'dmSans': ['DM Sans', 'sans-serif'],
      'bondiMono': ['Bodoni Moda', ' serif']
    }
  },
  plugins: [],
};
