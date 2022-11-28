import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteExternalsPlugin } from "vite-plugin-externals";
import qiankun from "vite-plugin-qiankun";

const useDevMode = true;

const isQuankunSubApp = true;

// https://vitejs.dev/config/
const baseConfig: UserConfig = {
  plugins: [
    vue(),
    qiankun("vue3-vite", { useDevMode }),
    viteExternalsPlugin(
      {
        "@wangeditor/editor": "window.wangEditor",
      },
      { useWindow: false }
    ),
  ],
  server: {
    //base:'/vue3-vite/',
    port: 8001,
    cors: true,
  },
  resolve: {
    alias: {},
  },
};

if (isQuankunSubApp) {
  baseConfig.plugins[2] = viteExternalsPlugin(
    {
      "@wangeditor/editor": "window.proxy.wangEditor",
    },
    { useWindow: false }
  );
}

export default ({ mode }: any) => {
  // 在部署模式下静态资源可以正常显示
  baseConfig.base = "http://127.0.0.1:8002/";
  if (mode === "development") {
    baseConfig.base = "/";
  }
  return baseConfig;
};
