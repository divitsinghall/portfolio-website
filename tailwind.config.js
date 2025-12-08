/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: '#030303',
        surface: '#0A0A0A',
        surfaceHighlight: '#121212',
        border: '#222222',
        primary: '#E1E1E1',
        secondary: '#888888',
        accent: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 5px #3B82F6, 0 0 10px #3B82F6' },
          'to': { boxShadow: '0 0 10px #3B82F6, 0 0 20px #3B82F6, 0 0 30px #3B82F6' },
        },
      },
    },
  },
  plugins: [],
}