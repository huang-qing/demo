import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    //port: 8008,
    cors: true,
  },
  optimizeDeps: {
    //exclude: [""],
  },
});
