import { nextui } from "@nextui-org/react";
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FEFCEE",
            primary: {
              DEFAULT: "#610726",
            },
            secondary: {
              DEFAULT: "#C4841D"
            },
            danger: {
              DEFAULT: "#F31260",
            },
          }
        }
      }
    }),
    containerQueries,
  ],
}