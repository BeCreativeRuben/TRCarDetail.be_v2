import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
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
        heading: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
