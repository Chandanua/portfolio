import type { Config } from "tailwindcss";

// Triggering a tailwind rebuild
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        accent: "#00ffe1",
        accent2: "#9b59ff",
        bg: "#060014",
        panel: "#0e0b14",
        muted: "#9aa4bf",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.7", filter: "blur(26px)" },
          "50%": { opacity: "1", filter: "blur(36px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 255, 225, 0.3)",
        neon2: "0 0 20px rgba(155, 89, 255, 0.3)",
      },
    },
  },
  plugins: [],
} satisfies Config;
