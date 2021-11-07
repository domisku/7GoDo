const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      rotate: {
        '135': '135deg'
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(50%)',
                  opacity: '0' },
          '100%': { transform: 'translateX(0%)',
                    opacity: '1' },
        }
      },
      animation: {
        slide: 'slide 300ms ease-in-out forwards',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.custom-gradient': {
          background: 'repeating-linear-gradient( #F3F4F6, #F3F4F6 3rem, #fff 0rem, #fff 6rem)'
        }
      };
      addUtilities(newUtilities);
    })
  ],
}
