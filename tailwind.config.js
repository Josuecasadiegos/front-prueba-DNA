/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(240 10% 3.9%)',
        foreground: 'hsl(0 0% 98%)',
        primary: 'hsl(243 75% 59%)', // indigo
        primaryHover: 'hsl(243 75% 50%)',
        muted: 'hsl(240 3.7% 15.9%)',
        mutedForeground: 'hsl(240 5% 64.9%)',
        border: 'hsl(240 3.7% 15.9%)',
        input: 'hsl(240 3.7% 15.9%)',
        ring: 'hsl(243 75% 59%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}