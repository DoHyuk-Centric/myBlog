import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  base: '/',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "pages/about.html"),
        devLog: resolve(__dirname, "pages/devLog.html"),
        login: resolve(__dirname, "pages/login.html"),
        "404": resolve(__dirname, "pages/404.html"),
        forgotPassword: resolve(__dirname, "pages/forgot-password.html"),
        policy: resolve(__dirname, "pages/policy.html"),
        post: resolve(__dirname, "pages/post.html"),
        postCorrection: resolve(__dirname, "pages/postCorrection.html"),
        postCreate: resolve(__dirname, "pages/postCreate.html"),
        profile: resolve(__dirname, "pages/profile.html"),
        terms: resolve(__dirname, "pages/terms.html"),
      },
    },
  },
  preview: {
    middlewareMode: false,
  },
});
