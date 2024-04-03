import { Colors, colors } from "./src/app/utils/colors"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [Colors.BLACK, Colors.OFFWHITE, Colors.NAVYBLUE, Colors.OLIVEGREEN, Colors.BURGUNDY, Colors.BEIGE, Colors.MAROON, Colors.TEAL, Colors.MUSTARD, Colors.BLUE, Colors.WHITE, Colors.GREY].map(c => `bg-colors-filter-${c} text-colors-filter-${c} text-colors-text-${c}`),
  theme: {
    extend: {
      colors: {
        colors
      },
    },
  },
  plugins: [],
};


