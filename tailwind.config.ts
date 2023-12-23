import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // A deep blue shade for primary actions and elements
        secondary: "#FBBF24", // A warm yellow for secondary elements and accents
        background: "#F3F4F6", // A light gray for page backgrounds
        textMain: "#111827", // Dark gray for primary text
        textSecondary: "#374151", // Medium gray for secondary text
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // A modern, sans-serif font for body text
        heading: ["Poppins", "sans-serif"], // A bold, impactful font for headings
      },
      spacing: {
        "18": "4.5rem", // Custom spacing value
        "22": "5.5rem", // Another custom spacing value
      },
      borderRadius: {
        xl: "1rem", // Extra-large border radius for elements like buttons, cards
      },
    },
  },
  plugins: [],
};
export default config;
