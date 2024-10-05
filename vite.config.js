// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the output directory for the build
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
});