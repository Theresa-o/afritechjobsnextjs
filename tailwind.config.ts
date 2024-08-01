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
        purple: {
          100: "#EAE9FE",
          200: "#756CF4",
          // 700: '#977669',
          // 800: '#846358',
          900: "#6357F1",
        },
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      // colors: {
      //   "afri-purple": "#6054ef",
      //   "light-purple": "#EAE9FE",
      // },
    },
  },
  variants: {
    extend: {
      borderColor: ["hover", "active"],
    },
  },
  plugins: [],
};
export default config;
