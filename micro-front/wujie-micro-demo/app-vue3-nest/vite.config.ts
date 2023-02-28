import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "app-vue3",
      remotes: {
      },
      shared: ["vue"],
    }),
  ],
  server: {
    port: 8001,
    cors: true,
  },
});
