/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cyber-cyan': '#06b6d4',
                'cyber-pink': '#d946ef',
                'cyber-purple': '#a855f7',
                'cyber-blue': '#3b82f6',
                'cyber-dark': '#030014',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            animation: {
                'gradient-x': 'gradient-x 3s ease infinite',
                'gradient-y': 'gradient-y 3s ease infinite',
                'spin-slow': 'spin 10s linear infinite',
                'reverse-spin': 'spin 15s linear infinite reverse',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'scan-line': 'scan-line 4s linear infinite',
                'text-reveal': 'text-reveal 1s ease forwards',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                'gradient-y': {
                    '0%, 100%': { backgroundPosition: '50% 0%' },
                    '50%': { backgroundPosition: '50% 100%' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' },
                    '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(6, 182, 212, 0.8)' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'scan-line': {
                    '0%': { top: '-20%' },
                    '100%': { top: '120%' },
                },
                'text-reveal': {
                    '0%': { clipPath: 'inset(0 100% 0 0)' },
                    '100%': { clipPath: 'inset(0 0 0 0)' },
                },
            },
            backgroundSize: {
                '200%': '200% 200%',
            },
        },
    },
    plugins: [],
}
