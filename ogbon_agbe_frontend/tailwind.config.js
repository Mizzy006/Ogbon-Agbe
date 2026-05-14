/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Critical for manual toggling
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Light Mode (Defaults)
        'osun-cream': '#fdf8f0',
        'osun-green-mid': '#2d6a4f',
        // Dark Mode
        'osun-bg-dark': '#0f110e',
        'osun-card-dark': '#1a1d1a',
        // Brand
        'osun-gold': '#e9c46a',
        'osun-green-bright': '#40916c',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}