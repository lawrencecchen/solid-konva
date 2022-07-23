import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import UnocssPlugin from "@unocss/vite";
import { resolve } from "node:path";
import typescript from "@rollup/plugin-typescript";

const resolvePath = (str: string) => resolve(__dirname, str);

export default defineConfig({
  plugins: [
    solidPlugin(),
    UnocssPlugin({
      // your config or in uno.config.ts
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "lib/index.tsx"),
      name: "solid-konva",
      // the proper extensions will be added
      fileName: "solid-konva",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["solid-js", "konva"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          "solid-js": "solid",
          konva: "Konva",
        },
      },
      plugins: [
        typescript({
          target: "es2020",
          rootDir: resolve(__dirname, "./lib"),
          declaration: true,
          declarationDir: resolve(__dirname, "./dist"),
          exclude: resolve(__dirname, "./node_modules/**"),
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
  },
});
