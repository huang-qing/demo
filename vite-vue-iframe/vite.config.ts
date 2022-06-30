import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        //nested: resolve(__dirname, "src/nested/xmlEditor/index.html"),
        xml: resolve(__dirname, "xml.html"),
        "xml-cdn": resolve(__dirname, "xml-cdn.html")
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      // include:[/nested/]
    },
  },
  resolve: {
    alias: {
      //headroomjs: "./node_modules/headroom.js/dist/headroom.js",
    },
  },
  optimizeDeps:{
    //include:['headroomjs']
  }
});
