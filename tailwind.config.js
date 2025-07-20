/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  darkMode: 'media', 
  theme: {
    extend: {
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      dropShadow: {
        'glow': '0 0 10px rgba(255,255,0,0.7), 0 0 20px rgba(255,255,0,0.5)',
        'glow-hover': '0 0 15px rgba(255,255,0,0.9), 0 0 30px rgba(255,255,0,0.7)',
      }
    },
  },
  plugins: [],
};