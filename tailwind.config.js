/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: {
          50: "#f7f8fb",
          100: "#eef1f6",
          200: "#dce2ec",
          300: "#c5cedd",
          400: "#8b99ab",
          500: "#687789",
          600: "#526071",
          700: "#364152",
          800: "#202938",
          900: "#111827",
          950: "#080d16",
        },
        signal: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
        },
        flame: {
          400: "#fb923c",
          500: "#f97316",
        },
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(15, 23, 42, 0.28)",
        lift: "0 24px 80px -48px rgba(15, 23, 42, 0.45)",
      },
      borderRadius: {
        brand: "0.625rem",
      },
    },
  },
  plugins: [],
};
