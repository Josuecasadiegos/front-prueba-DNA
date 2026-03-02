// tailwind.config.js
import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(240 10% 3.9%)',
        foreground: 'hsl(0 0% 98%)',
        primary: 'hsl(243 75% 59%)',
        primaryHover: 'hsl(243 75% 50%)',
        muted: 'hsl(240 3.7% 15.9%)',
        mutedForeground: 'hsl(240 5% 64.9%)',
        border: 'hsl(240 3.7% 15.9%)',
        input: 'hsl(240 3.7% 15.9%)',
        ring: 'hsl(243 75% 59%)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}