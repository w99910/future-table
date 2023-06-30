import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "./index.js"),
      name: "FutureTable",
      formats: ["es"],
      fileName: (format) => `future-table.js`,
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
