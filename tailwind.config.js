/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#633cff",
        "light-purple": "#beadff",
        "very-light-purple": "#efebff",
        "custom-black": "#333333",
        "dark-gray": "#737373",
        gray: "#d9d9d9",
        "light-gray": "#fafafa",
        red: "#ff3939",
      },
    },
  },
  plugins: [],
};
