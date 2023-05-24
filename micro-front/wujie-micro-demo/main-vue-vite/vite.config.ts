import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 4173,
    // 使用代理
    proxy: {
      // 这种方式dev中的proxy无法实现，子应用内部请求无法代理，造成获取资源不正确
      "/app-react-proxy": {
        target: "http://localhost:8002/",
        //changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/app-react-proxy/, ""),
      },
      "/app-react": {
        target: "http://localhost:8007/",
        //changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/app-react/, ""),
      },
    },
  },
});
