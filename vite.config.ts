import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import watchAndRun from "vite-plugin-watch-and-run";
import path, { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // https://stackoverflow.com/questions/72618944/get-error-to-build-my-project-in-vite-top-level-await-is-not-available-in-the
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'dev/index.html'),
      },
    },
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
        // `vite build` sets a mode"  production by default, but for some reason
        // when we run this script the variable is set to development;
        // this triggers the importing of a mock file which is intended
        // for dev mode only;
        // the file is then referenced in the bundled app, but not copied over
        // to the __ymock dir, thus breaking the app.
        // SO, we're forcing the production env var at the start of the script!
        run: "npm run clean && cross-env NODE_ENV=production vite build && cross-env REPO_MODE=true npm run postinstall",
      },
    ]),
  ],
});
