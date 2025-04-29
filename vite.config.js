import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Changed from "./" to "/"
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true, // Important for client-side routing
  },
  preview: {
    historyApiFallback: true, // Important for Vercel preview
  },
});
