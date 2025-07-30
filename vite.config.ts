/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Created to avoid CORS error when making request to geocoding directly from the browser
  server: {
    proxy: {
      "/api/geocode": {
        target: "https://geocoding.geo.census.gov",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/geocode/, "/geocoder/locations/onelineaddress"),
      },
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
