/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // display: ['Cormorant Garamond', 'serif'],
        // body: ['DM Sans', 'sans-serif'],
        palanquin: ['Palanquin', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#782423',
          light: '#a64241',
        },
        cream: '#F5F0EB',
        warm: '#EDE5DA',
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
