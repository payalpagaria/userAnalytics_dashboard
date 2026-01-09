import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      "/api": {
        target: "https://useranalytics-1gzm.onrender.com", 
    

        changeOrigin: true
      }
    }
  }
});
