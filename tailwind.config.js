/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        qm: {
          bg: '#020817',
          surface: '#061024',
          card: '#0B1730',
          'card-hover': '#102244',
          cyan: '#00E5FF',
          'cyan-hover': '#38EFFF',
          'cyan-dark': '#009bb3',
          'cyan-glow': 'rgba(0, 229, 255, 0.25)',
          muted: '#9FB1C7',
          border: 'rgba(0, 229, 255, 0.15)',
          'border-hover': 'rgba(0, 229, 255, 0.4)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -5px rgba(0, 229, 255, 0.3)',
        'cyan-glow-sm': '0 0 15px -3px rgba(0, 229, 255, 0.25)',
        'cyan-glow-lg': '0 0 40px -10px rgba(0, 229, 255, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
