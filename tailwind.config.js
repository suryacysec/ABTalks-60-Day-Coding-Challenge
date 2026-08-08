/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#0A0A0F',
        card: '#13131A',
        primary: '#7C3AED',
        secondary: '#3B82F6',
        success: '#10B981',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
}
