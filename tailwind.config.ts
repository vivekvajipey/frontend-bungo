import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
    keyframes: {
      scan: {
        '0%, 100%': { transform: 'translateX(-100%)' },
        '50%': { transform: 'translateX(100%)' },
      },
      pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '.7' },
      }
    },
    animation: {
      scan: 'scan 2s linear infinite',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config;
