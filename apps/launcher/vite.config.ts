import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import watchAndRun from "vite-plugin-watch-and-run";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // @ts-ignore
    watchAndRun([
      {
        name: "rebuild",
        watchKind: ["add", "change", "unlink"],
        watch: path.resolve("src/**/*.*"),
        run: "npm run build",
      },
    ]),
  ],
  build: {
    lib: {
      // https://vitejs.dev/guide/build.html#library-mode
      entry: resolve(__dirname, "index.ts"),
      name: "yMockLauncher",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
