import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          50: "#fff5f9",
          100: "#ffe6f0",
          200: "#ffc9df",
          300: "#ffa1c6",
          400: "#ff6fa7",
          500: "#ff3d8a",
          600: "#e51a6c",
          700: "#b31255",
          800: "#7f0d3d",
          900: "#4a0724",
        },
        night: {
          50: "#f6f5fb",
          100: "#e9e6f4",
          800: "#211b2e",
          900: "#150f22",
          950: "#0b0716",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "float-y": "floatY 4s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
