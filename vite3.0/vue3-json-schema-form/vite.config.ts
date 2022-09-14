import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  //console.log("TYPE:", process.env.TYPE);
  return { plugins: [vue()] };
});
