/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        zaurus: {
          // LCD screen colors
          "lcd-bg": "#9EAD6F",
          "lcd-dark": "#5E6E4A",
          "lcd-light": "#B8C88A",
          "lcd-pixel": "#4A5A3A",
          // Shell/device colors
          "shell-dark": "#3A3A3A",
          "shell-mid": "#4A4A4A",
          "shell-light": "#5A5A5A",
          "shell-highlight": "#6A6A6A",
          // Button colors
          "btn-face": "#4A4A4A",
          "btn-highlight": "#6A6A6A",
          "btn-shadow": "#2A2A2A",
          // Semantic colors
          "amber": "#d4a857",
          "error": "#c74a4a",
          "overlay": "#000000",
        },
      },
      fontFamily: {
        lcd: ['"VT323"', '"Courier New"', "monospace"],
      },
      boxShadow: {
        "inset-lcd":
          "inset 4px 4px 8px rgba(0,0,0,0.4), inset -2px -2px 4px rgba(255,255,255,0.1)",
        beveled: "2px 2px 0 #2A2A2A, -2px -2px 0 #6A6A6A, inset 1px 1px 0 #5A5A5A",
        "beveled-pressed": "inset 2px 2px 4px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
