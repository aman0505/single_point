const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  variants: {
    textColor: ({ after }) => after(['invalid']),
  },
  theme: {
    extend: {
      fontFamily: {
        sfPro: ['SF Pro Display', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],

      },
    },
  },
  // plugins: [plugin(({ addVariant, e }) => {
  //   addVariant('invalid', ({ modifySelectors, separator }) => {
  //     modifySelectors(({ className }) => `.${e(`invalid${separator}${className}`)}:invalid`);
  //   });
  // })],
  plugins: [
    require('tailwind-scrollbar-hide'),

  ],
};
