import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      name: "ymock",
      fileName: "ymock"
    },
    // cssCodeSplit: true
  },
  plugins: [
    react(),
  ]
});
