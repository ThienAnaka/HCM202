/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soviet: {
          red: "#008001",
          gold: "#ffcd00",
          orange: "#f59e0b",
          white: "#ffffff",
          offwhite: "#fff9f9",
          darkred: "#008001",
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      boxShadow: {
        'red-glow': '0 0 15px rgba(0, 128, 1, 0.2)',
        'gold-glow': '0 0 15px rgba(245, 158, 11, 0.2)',
      }
    },
  },
  plugins: [],
}
