import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import typescript from "rollup-plugin-typescript2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    typescript({
      check: false,
      include: ["./src/**/*.ts"],
      exclude: ["vite.config.ts"],
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationMap: true,
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
