import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#9333EA',
        accent: '#F59E0B',
        background: '#F3F4F6',
        foreground: '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        spinSlow: 'spin 5s linear infinite',
        pulseFast: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
        bounceOnce: 'bounce 0.6s ease-in-out 1',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        'section': '5rem',
        'compact': '2.5rem',
      },
    },
  },
  plugins: [],
}
export default config
