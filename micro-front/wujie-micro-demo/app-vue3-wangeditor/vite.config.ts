import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
});
