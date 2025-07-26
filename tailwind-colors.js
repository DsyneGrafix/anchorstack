// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AnchorStack Brand Colors
        anchor: {
          50: '#f8fafb',
          100: '#f1f5f7',
          200: '#e1eaef',
          300: '#d0dde4',
          400: '#9db8c5',
          500: '#6a9bb0',
          600: '#437D9B', // Primary brand blue
          700: '#366489',
          800: '#2a4f6d',
          900: '#1e3a51',
        },
        primary: {
          50: '#f0f8f8',
          100: '#d9eef0',
          200: '#b6dde1',
          300: '#85c7ce',
          400: '#4FB1AF', // Teal accent
          500: '#3a9b99',
          600: '#2f8280',
          700: '#276968',
          800: '#1f5453',
          900: '#174342',
        },
        neutral: {
          50: '#faf9f8',
          100: '#f5f4f2',
          200: '#EAE6E1', // Warm neutral
          300: '#ddd7cf',
          400: '#c5bdb1',
          500: '#a59c8b',
          600: '#8b7f6e',
          700: '#716658',
          800: '#5a5046',
          900: '#463d36',
        },
        accent: {
          50: '#fef9f2',
          100: '#fdf0e0',
          200: '#fadcc0',
          300: '#f5c394',
          400: '#D7B47A', // Gold accent
          500: '#ca9f5f',
          600: '#b88948',
          700: '#9a6f3a',
          800: '#7d5831',
          900: '#66482a',
        },
        warning: {
          50: '#fef6f6',
          100: '#fcebeb',
          200: '#f8d8d8',
          300: '#f2b8b8',
          400: '#e99191',
          500: '#C56D6B', // Coral/salmon
          600: '#b85754',
          700: '#984543',
          800: '#7d393a',
          900: '#683233',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}