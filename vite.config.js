import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://useranalytics-1gzm.onrender.com", // your Node backend
        changeOrigin: true
      }
    }
  }
});
