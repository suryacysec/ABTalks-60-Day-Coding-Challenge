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
        'card-hover': '#1A1A24',
        primary: '#7C3AED',
        'primary-light': '#A78BFA',
        secondary: '#3B82F6',
        'secondary-light': '#60A5FA',
        success: '#10B981',
        'success-light': '#34D399',
        danger: '#EF4444',
        'danger-light': '#F87171',
        amber: '#F59E0B',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'pulse-glow 2s ease-in-out infinite',
        'gradient-rotate': 'gradientRotate 4s ease infinite',
        'flame': 'flame-flicker 0.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(124, 58, 237, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.6)' },
        },
        gradientRotate: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'flame-flicker': {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1)', opacity: '1' },
          '25%': { transform: 'scaleY(1.1) scaleX(0.95)', opacity: '0.9' },
          '50%': { transform: 'scaleY(0.95) scaleX(1.05)', opacity: '1' },
          '75%': { transform: 'scaleY(1.05) scaleX(0.98)', opacity: '0.95' },
        },
      },
    },
  },
  plugins: [],
}
