import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const uuid = `${new Date().getTime()}`;

process.env.VITE_UUID = uuid;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
