tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#0032A0", // Pantone 286 C
                "primary-hover": "#002880",
                "primary-light": "#335CC0",
                "background-light": "#f3f4f6", // Gray 100
                "background-dark": "#0f172a", // Slate 900
                "surface-dark": "#1e293b",    // Slate 800
                "surface-light": "#ffffff",
                "border-light": "#e5e7eb",    // Gray 200
                "border-dark": "#334155",     // Slate 700
                "text-primary": "#f8fafc",    // Slate 50
                "text-secondary": "#94a3b8",  // Slate 400
                "text-muted": "#64748b",      // Slate 500
                "military-dark": "#1a1a1d",
                "archive-light": "#f0f0f0",
                "accent-steel": "#4a5568",
                "accent-gold": "#c5a065",
                "pearl-white": "#fdfcf0",
            },
            fontFamily: {
                "display": ["Public Sans", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
            backgroundImage: {
                'gradient-primary': "linear-gradient(135deg, #0032A0 0%, #0050d5 100%)",
                'gradient-surface-dark': "linear-gradient(to bottom right, #1e293b, #0f172a)",
                'military-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                'accent-gradient': 'linear-gradient(90deg, #0032A0 0%, #0055ff 100%)',
            },
            boxShadow: {
                'glow': '0 0 15px rgba(0, 50, 160, 0.5)',
                'glow-lg': '0 0 30px rgba(0, 50, 160, 0.6)',
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                'breathing': 'breathing 3s ease-in-out infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                breathing: {
                    '0%, 100%': { opacity: '0.4', transform: 'scaleX(0.95)' },
                    '50%': { opacity: '1', transform: 'scaleX(1)' },
                }
            }
        },
    },
}
