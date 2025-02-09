import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'fit': '798px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      flexGrow: {
        2: '2',
        5: '5', 
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        sniglet: ['Sniglet', 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config;
