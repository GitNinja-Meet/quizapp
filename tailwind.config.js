/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dark-blue": "#002B5B", // Custom dark blue
        "light-green": "#B1FF6F", // Custom light green
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in-out forwards", // Fade-in animation
        glow: "glow 3s ease-in-out infinite", // Glowing effect animation
        bounce: "bounce 2s infinite", // Bouncing animation
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { textShadow: "0 0 10px #B1FF6F, 0 0 20px #B1FF6F" },
          "50%": { textShadow: "0 0 20px #80FF3E, 0 0 30px #80FF3E" },
        },
      },
    },
  },
  plugins: [],
};
