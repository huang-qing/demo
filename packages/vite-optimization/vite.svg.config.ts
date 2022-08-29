import { UserConfigExport } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

export default (): UserConfigExport => {

  return {
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
  };
};
