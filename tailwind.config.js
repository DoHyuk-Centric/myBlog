/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        A2Z: ["A2Z-SemiBold", "sans-serif"]
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
