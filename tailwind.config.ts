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
                // Lime accent palette
                primary: "#ADF802",
                secondary: "#C4FF33",
                accent: "#D4FF66",
                gold: "#ADF802",
                crimson: "#ADF802",
                light: "#0A0A0A",
                dark: {
                    900: "#FFFFFF",
                    800: "#F8F8F8",
                    700: "#F2F2F2",
                    600: "#FAFAFA",
                },
                // aliases
                "neon-cyan": "#ADF802",
                "neon-violet": "#8BC700",
                "neon-blue": "#C4FF33",
                "neon-green": "#ADF802",
                "neon-pink": "#8BC700",
            },
            fontFamily: {
                sans: ["Kalam", "cursive"],
                display: ["Caveat", "cursive"],
                hand: ["Patrick Hand", "cursive"],
                marker: ["Permanent Marker", "cursive"],
                mono: ["JetBrains Mono", "Fira Code", "monospace"],
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
                "gradient-gold": "linear-gradient(135deg, #B4833D 0%, #E8C97A 50%, #D4A95A 100%)",
                "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

export default config;
