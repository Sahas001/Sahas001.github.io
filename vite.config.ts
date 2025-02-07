import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Change from "/" to "./" to fix GitHub Pages MIME issues
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});

