import path from "path";
import { build } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

(async () => {
  await build({
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          "svg-icons": "script/svg-icons-register.ts",
        },
        output: {
          entryFileNames: "index.js",
        },
      },
      outDir: "src/assets/svg-icons-register/",
    },
  });
})();
