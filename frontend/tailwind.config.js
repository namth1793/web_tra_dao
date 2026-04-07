/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:       '#5C3317',
        'primary-h':   '#7A4B2A',
        accent:        '#C9A96E',
        'accent-h':    '#B8944F',
        cream:         '#F5EFE0',
        'cream-d':     '#EDE4D0',
        'page-bg':     '#FAFAF8',
        'section-alt': '#F7F3EE',
        'card-bg':     '#FFFFFF',
        'text-dark':   '#1A0F05',
        'text-body':   '#4A3728',
        'text-muted':  '#8B7355',
        'border-warm': '#E5D9C8',
        'price-red':   '#C0392B',
        'footer-bg':   '#1A0F05',
        'footer-text': '#C8B89A',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card:    '0 2px 12px rgba(92,51,23,0.08)',
        'card-h':'0 8px 24px rgba(92,51,23,0.14)',
        header:  '0 1px 0 #E5D9C8',
      },
      borderRadius: {
        xl2: '1rem',
        xl3: '1.25rem',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-8deg)' },
          '50%':       { transform: 'rotate(8deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        wiggle:       'wiggle 0.7s ease-in-out infinite',
        'bounce-slow':'bounce-slow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
