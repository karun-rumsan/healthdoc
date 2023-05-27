import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173, // dev server on 8090
    proxy: {
      "/api/": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
