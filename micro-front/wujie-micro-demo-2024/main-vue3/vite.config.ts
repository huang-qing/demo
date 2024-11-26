import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//import vueJsx from "@vitejs/plugin-vue-jsx";
//import wujiePlugin from "./plugin/vite-plugin-wujue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //vueJsx(),
  ],
  resolve: {
    alias: {
      //"@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    https: true,
    port: 4173,
    // 使用代理
    // proxy: {
    //   // 这种方式dev中的proxy无法实现，子应用内部请求无法代理，造成获取资源不正确
    //   "/app-react-proxy": {
    //     target: "http://127.0.0.1:8002/",
    //     //changeOrigin: true,
    //     //rewrite: (path) => path.replace(/^\/app-react-proxy/, ""),
    //   },
    //   "/app-react": {
    //     target: "http://127.0.0.1:8007/",
    //     //changeOrigin: true,
    //     //rewrite: (path) => path.replace(/^\/app-react/, ""),
    //   },
    // },
  },
  build: {
    minify: false,
    chunkSizeWarningLimit: 3048,
  },
  preview: {
    //https: true,
  },
});
