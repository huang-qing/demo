//import path from "path";
//import { build } from "vite";
//import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const path = require("path");
const { build } = require("vite");
const { createSvgIconsPlugin } = require("vite-plugin-svg-icons");

(async () => {
  await build({
    configFile: false,
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons")],
        //iconDirs: ["../../src/icons"],
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          //"svg-icons": "../svg-icons/svg-icons-register.ts",
          "svg-icons": path.resolve(
            process.cwd(),
            "script/svg-icons/svg-icons-register.js"
          ),
        },
        output: {
          //entryFileNames: "index.js",
          entryFileNames: "index.js",
        },
      },
      //outDir: "../../src/assets/svg-icons-register/",
      outDir: path.resolve(process.cwd(), "src/assets/svg-icons-register/"),
    },
  });
})();
