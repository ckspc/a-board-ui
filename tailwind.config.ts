import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        castoro: ["Castoro", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "green-500": "#243831",
        "green-300": "#2B5F44",
        "green-100": "#D8E9E4",
        "btn-success": "#49A569",
        "btn-success-hover": "#52c47a",
        "gray-100": "#BBC2C0"
      },
    },
  },
  plugins: [],
} satisfies Config;
