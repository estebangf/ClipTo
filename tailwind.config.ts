import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: '0', transform: 'translateY(10px)' },
          '40%': { opacity: '1', transform: 'translateY(0)' },
          '60%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-out': 'fadeInOut 3s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
