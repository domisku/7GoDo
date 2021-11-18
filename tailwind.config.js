module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        '320': '320ms'
      },
      rotate: {
        '135': '135deg'
      },
      screens: {
        'landscape': {'raw': '(orientation: landscape)'},
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
      },
      height: {
        custom: 'calc(100vh - 11.2rem)',
        sidebar: 'calc(100% - 3rem)'
      },
      width: {
        custom: 'calc(100% - 18rem)',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
