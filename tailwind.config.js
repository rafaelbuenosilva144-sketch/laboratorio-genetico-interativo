/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lab: {
          bg: "#040816",
          card: "rgba(10, 16, 38, 0.72)",
          cyan: "#00E5FF",
          purple: "#8B5CF6",
          white: "#F8FBFF"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,229,255,.15), 0 0 30px rgba(0,229,255,.12), 0 0 60px rgba(139,92,246,.08)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
