import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import wujiePlugin from "./plugin/vite-plugin-wujue";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";
import http2 from "vite-plugin-http2-proxy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mkcert(),
    http2({
      "/app-react-proxy": {
        target: "http://127.0.0.1:8002/",
        //changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/app-react-proxy/, ""),
      },
      "/app-react": {
        target: "http://127.0.0.1:8007/",
        //changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/app-react/, ""),
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      // devOptions: {
      //   enabled: true,
      // },
      workbox: {
        maximumFileSizeToCacheInBytes: 1024000 * 4,
        runtimeCaching: [
          {
            // urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            //urlPattern: /^http:\/\/(localhost|127\.0\.0\.1):(8008|8002).*?\.(js|css)$/i,
            urlPattern: /^http:\/\/.*\.(js|css)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "workbox-subappcache",
              expiration: {
                maxEntries: 10,
                //maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                maxAgeSeconds: 60 * 60 * 24, // <== 1 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // {
          //   urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          //   handler: "CacheFirst",
          //   options: {
          //     cacheName: "gstatic-fonts-cache",
          //     expiration: {
          //       maxEntries: 10,
          //       maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          //     },
          //     cacheableResponse: {
          //       statuses: [0, 200],
          //     },
          //   },
          // },
        ],
      },
    }),
    wujiePlugin(),
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
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
    https: true,
  },
});
