/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0A0908',
        'secondary-dark': '#22333B',
        'light': '#F2F4F3',
        'accent-red': '#FF2E00',
        'accent-dark-red': '#B80C09',
      },
      fontFamily: {
        'heading': ['Bebas Neue', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Cormorant Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
