import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#fffc61",
        "background-light": "#f8f8f5",
        "background-dark": "#121212",
        "text-main": "#181810",
        "text-muted": "#4b5563",
        "border-light": "#000000",
        "mint": "#bdf6e4",
        "lavender": "#c7d2fe",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "serif": ["Playfair Display", "serif"]
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      boxShadow: {
        'playful': '4px 4px 0px 0px #000000',
        'pricing-card': '8px 8px 0px 0px #000000',
      }
    },
  },
  plugins: [
    animate,
  ],
}
