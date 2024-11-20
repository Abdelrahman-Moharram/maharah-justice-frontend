import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      blur: {
        DEFAULT: '0px', // Changes default blur to 0px
        sm: '0px',
        md: '0px',
        lg: '0px',
      },
      colors: {
        foreground: "var(--foreground)",
        'primary': '#FBB827',
        'secondary':'#5F605F',
      
        background: "var(--background)",
        container: "rgba(var(--container))",
        border: "rgba(var(--border))",
        "card": "rgba(var(--card))",
        "side-nav": "rgba(var(--side-nav))",
        
        "color": "rgba(var(--color))",
        'negitaive-color': "rgba(var(--negitaive-color)) !important",
      },
      height:{
        'custom-screen': 'calc(100vh-64px)'
      },
      backgroundImage:{
        'login-image':"url('/Login.png')"
      }
    },    
  },
  plugins: [],
  corePlugins:{
    blur: false, // Disables all blur utilities
  }
};
export default config;
