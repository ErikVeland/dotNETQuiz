/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient-flow': 'gradientFlow 45s ease infinite',
      },
      keyframes: {
        gradientFlow: {
          '0%, 100%': {
            background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
            'background-size': '400% 400%',
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        }
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.glass-morphism': {
          'background': 'rgba(255, 255, 255, 0.25)',
          'backdrop-filter': 'blur(10px)',
          'border-radius': '10px',
          'border': '1px solid rgba(255, 255, 255, 0.18)',
          'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        },
        '.glass-tier-foundational': {
          'background': 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15))',
          'border-color': 'rgba(59, 130, 246, 0.3)',
        },
        '.glass-tier-core': {
          'background': 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15))',
          'border-color': 'rgba(16, 185, 129, 0.3)',
        },
        '.glass-tier-specialized': {
          'background': 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(124, 58, 237, 0.15))',
          'border-color': 'rgba(139, 92, 246, 0.3)',
        },
        '.glass-tier-quality': {
          'background': 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(239, 68, 68, 0.15))',
          'border-color': 'rgba(245, 158, 11, 0.3)',
        },
        '.glass-interactive': {
          'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          'cursor': 'pointer',
        },
        '.glass-interactive:hover': {
          'transform': 'translateY(-2px) scale(1.02)',
          'box-shadow': '0 16px 48px rgba(0, 0, 0, 0.15)',
          'border-color': 'rgba(255, 255, 255, 0.4)',
        },
        '.glass-interactive:active': {
          'transform': 'translateY(0) scale(1)',
        },
        '.glass-module-card': {
          'padding': '1.5rem',
          'height': '100%',
          'display': 'flex',
          'flex-direction': 'column',
          'position': 'relative',
        },
        '.glass-module-card::after': {
          'content': '""',
          'position': 'absolute',
          'top': '0',
          'left': '0',
          'right': '0',
          'height': '4px',
          'background': 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          'border-radius': '1rem 1rem 0 0',
        },
        '.glass-module-card.tier-core::after': {
          'background': 'linear-gradient(135deg, #10b981, #059669)',
        },
        '.glass-module-card.tier-specialized::after': {
          'background': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        },
        '.glass-module-card.tier-quality::after': {
          'background': 'linear-gradient(135deg, #f59e0b, #ef4444)',
        }
      });
    }
  ],
}