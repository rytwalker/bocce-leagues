import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/hero-bg-img.png')",
      },
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        blue: {
          400: "#2589FE",
          500: "#0070F3",
          600: "#2F6FEB",
        },
        slate: {
          "50": "#f7f7f8",
          "100": "#eeeef0",
          "200": "#d9d9de",
          "300": "#b8b9c1",
          "400": "#91939f",
          "500": "#737584",
          "600": "#5d5e6c",
          "700": "#4c4d58",
          "800": "#41414b",
          "900": "#393941",
          "950": "#18181b",
        },
        patina: {
          "50": "#f4f9f8",
          "100": "#d9eee9",
          "200": "#b3dcd4",
          "300": "#86c2ba",
          "400": "#579d95",
          "500": "#428a83",
          "600": "#336e6a",
          "700": "#2c5956",
          "800": "#274846",
          "900": "#243d3c",
          "950": "#102322",
        },
        primary: {
          "50": "#eefbf4",
          "100": "#d5f6e2",
          "200": "#afebc9",
          "300": "#7bdaaa",
          "400": "#4ac48b",
          "500": "#22a76d",
          "600": "#148757",
          "700": "#106c49",
          "800": "#0f563b",
          "900": "#0e4631",
          "950": "#06281d",
        },
        "limed-spruce": {
          "50": "#f4f7f7",
          "100": "#e2eaeb",
          "200": "#c8d7d9",
          "300": "#a2bcbe",
          "400": "#75979b",
          "500": "#597c81",
          "600": "#4d686d",
          "700": "#43575b",
          "800": "#3e4d51",
          "900": "#354044",
          "950": "#20282c",
        },
        "off-white": {
          primary: "#FCFEED",
        },
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
