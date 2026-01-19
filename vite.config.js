import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "pages/about.html"),
        devLog: resolve(__dirname, "pages/devLog.html"),
        login: resolve(__dirname, "pages/login.html"),
      },
    },
  },
  preview: {
    middlewareMode: false,
  },
});
