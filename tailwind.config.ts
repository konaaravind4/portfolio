import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Wukong gold palette
                primary: "#C9A84C",
                secondary: "#E8C96D",
                accent: "#F5D97A",
                gold: "#C9A84C",
                crimson: "#8B0000",
                light: "#F0E6C8",
                dark: {
                    900: "#050507",
                    800: "#0A0A0D",
                    700: "#111118",
                    600: "#161620",
                },
                // aliases
                "neon-cyan": "#C9A84C",
                "neon-violet": "#8B0000",
                "neon-blue": "#E8C96D",
                "neon-green": "#C9A84C",
                "neon-pink": "#B8860B",
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Cinzel", "serif"],
                myth: ["Ma Shan Zheng", "serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            animation: {
                "float": "float 5s ease-in-out infinite",
                "float-slow": "float-slow 8s ease-in-out infinite",
                "float-orbital": "float-orbital 7s ease-in-out infinite",
                "marquee-left": "marquee-left 40s linear infinite",
                "marquee-right": "marquee-right 32s linear infinite",
                "pulse-warm": "pulse-warm 2s ease-in-out infinite",
                "gold-pulse": "gold-pulse 3s ease-in-out infinite",
                "levitate": "levitate 6s ease-in-out infinite",
                "shimmer": "shimmer-sweep 3s ease-in-out infinite",
            },
            keyframes: {
                float: { "0%, 100%": { transform: "translateY(0px) rotate(0deg)" }, "33%": { transform: "translateY(-14px) rotate(0.5deg)" }, "66%": { transform: "translateY(-8px) rotate(-0.5deg)" } },
                "float-slow": { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-20px)" } },
                "float-orbital": {
                    "0%": { transform: "translateY(0px) translateX(0px) rotate(0deg)" },
                    "25%": { transform: "translateY(-12px) translateX(6px) rotate(1deg)" },
                    "50%": { transform: "translateY(-18px) translateX(0px) rotate(0deg)" },
                    "75%": { transform: "translateY(-12px) translateX(-6px) rotate(-1deg)" },
                    "100%": { transform: "translateY(0px) translateX(0px) rotate(0deg)" },
                },
                "marquee-left": { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-50%)" } },
                "marquee-right": { "0%": { transform: "translateX(-50%)" }, "100%": { transform: "translateX(0%)" } },
                "pulse-warm": { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.4" } },
                "gold-pulse": {
                    "0%, 100%": { boxShadow: "0 0 10px rgba(201,168,76,0.3), 0 0 30px rgba(201,168,76,0.1)" },
                    "50%": { boxShadow: "0 0 25px rgba(201,168,76,0.6), 0 0 60px rgba(201,168,76,0.2)" },
                },
                "levitate": {
                    "0%, 100%": { transform: "perspective(800px) rotateX(2deg) translateY(0px)" },
                    "50%": { transform: "perspective(800px) rotateX(-1deg) translateY(-10px)" },
                },
                "shimmer-sweep": {
                    "0%": { backgroundPosition: "200% center" },
                    "100%": { backgroundPosition: "-200% center" },
                },
            },
            backgroundImage: {
                "gradient-gold": "linear-gradient(135deg, #C9A84C 0%, #F5D97A 50%, #E8C96D 100%)",
                "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

export default config;
