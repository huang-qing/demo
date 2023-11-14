import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import federation from "@originjs/vite-plugin-federation";
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({ registerType: 'autoUpdate' }),
    vue(),
    // federation({
    //   name: "app-vue3",
    //   remotes: {
    //     "libs": "http://localhost:7000/assets/remoteEntry.js",
    //     // "main-libraries": {
    //     //   external: "http://localhost:7000/assets/remoteEntry.js",
    //     //   from: "vite",
    //     //   format: "esm",
    //     // },
    //   },
    //   shared: ["vue"],
    // }),
  ],
  server: {
    port: 8007,
    cors: true,
  },
  optimizeDeps: {
    //exclude: ["@wangeditor/editor"],
  },
  build:{
    minify:false
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        //   hack: 'true; @import "~/styles/variables.less";@import "@crami/ui/es/style/themes/default";',
        //   'root-entry-name': 'variable',
        // },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
  },
});
