import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 项目需要部署在服务器的子目录下，根据开发环境或生产环境动态配置 vite.config.ts 中的 base 选项
  base:'/app-react/',
  server: {
    base:'/app-react/',
    port: 8002,
    cors: true,
  },
});
