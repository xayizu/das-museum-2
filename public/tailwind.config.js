/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./**/*.html",
        "./js/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#0032A0",
                "primary-hover": "#002880",
                "primary-light": "#335CC0",
                "background-light": "#f3f4f6",
                "background-dark": "#0f172a",
                "surface-dark": "#1e293b",
                "surface-light": "#ffffff",
                "border-light": "#e5e7eb",
                "border-dark": "#334155",
                "text-primary": "#f8fafc",
                "text-secondary": "#94a3b8",
                "text-muted": "#64748b",
                "military-dark": "#1a1a1d",
                "archive-light": "#f0f0f0",
                "accent-steel": "#4a5568",
                "accent-gold": "#c5a065",
            },
            fontFamily: {
                "display": ["Public Sans", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"],
            },
            backgroundImage: {
                'gradient-primary': "linear-gradient(135deg, #0032A0 0%, #0050d5 100%)",
                'gradient-surface-dark': "linear-gradient(to bottom right, #1e293b, #0f172a)",
                'military-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                'accent-gradient': 'linear-gradient(90deg, #0032A0 0%, #0055ff 100%)',
            }
        },
    },
    plugins: [],
}
