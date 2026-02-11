/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(-200px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
          
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-scale': {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
    },
     'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        float: 'float 2s ease-in-out infinite',
        'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
          'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        
      },
    },
  },
  plugins: [],
};
