/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
      },
      colors: {
        sand: { DEFAULT: '#F5EFE6', 2: '#EDE3D4' },
        ink: '#1A1208',
        gold: { DEFAULT: '#C9973A', 2: '#E8B84B' },
        warm: '#8B6914',
        sage: '#4A5E3A',
        clay: '#7A3B2A',
        cream: '#FDFAF6',
      },
    },
  },
  plugins: [],
};
