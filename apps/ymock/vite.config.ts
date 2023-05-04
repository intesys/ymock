import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import watchAndRun from "vite-plugin-watch-and-run";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // https://stackoverflow.com/questions/72618944/get-error-to-build-my-project-in-vite-top-level-await-is-not-available-in-the
    target: "esnext",
  },
  plugins: [
    // @ts-ignore
    react(),

    // @ts-ignore
    watchAndRun([
      {
        name: "rebuild",
        watchKind: ["add", "change", "unlink"],
        watch: path.resolve("src/**/*.*"),
        run: "npm run clean && vite build && cross-env REPO_MODE=true npm run postinstall",
      },
    ]),
  ],
});
