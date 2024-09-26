import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        'primary': '#FBB827',
        'secondary':'#5F605F',
      
        background: "var(--background)",
        container: "rgba(var(--container))",
        border: "rgba(var(--border))",
        "card": "rgba(var(--card))",
        
        "color": "rgba(var(--cta-text))",
        'negitaive-color': "rgba(var(--negitaive-color)) !important",
      },
    },    
  },
  plugins: [],
};
export default config;
