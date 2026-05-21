/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Critical for manual toggling class hooks
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic Theme Tokens
        'osun-cream': '#fdf8f0',
        'osun-bg-dark': '#0f110e',
        'osun-card-dark': '#1a1d1a',
        
        // Premium Brand Color System
        'osun-gold': '#e9c46a',
        'osun-green-mid': '#2d6a4f',
        'osun-green-bright': '#40916c',
        'osun-green-deep': '#1a3a2a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}