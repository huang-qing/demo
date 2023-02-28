import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import type { VitePluginFederationOptions } from "@originjs/vite-plugin-federation";
import ElementPlus from "unplugin-element-plus/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const federationOptions: VitePluginFederationOptions = {
    name: "team-red-use-libs",
    filename: "remoteEntry.js",
    remotes: {
      // "team-blue": "http://localhost:5002/assets/remoteEntry.js",
      // "team-green": "http://localhost:5003/assets/remoteEntry.js",
      // "team-libs": "http://localhost:4001/assets/remoteEntry.js",
      "team-blue": "/remote-team-blue/assets/remoteEntry.js",
      "team-green": "/remote-team-green/assets/remoteEntry.js",
      "team-libs": "/remote-team-libs/assets/remoteEntry.js",
    },
    shared: ["vue", "pinia"],
  };

  if (command === "build") {
    // 开发环境输出会报错
    federationOptions.exposes = {
      "./ProductPage": "./src/components/ProductPage.vue",
    };
  }

  const userConfig: UserConfig = {
    plugins: [ElementPlus(), vue(), federation(federationOptions)],
    // build: {
    //   minify: false,
    //   target: ["chrome89", "edge89", "firefox89", "safari15"],
    // },
    resolve: {
      alias: {
        //'aa/bbb':'team-blue222/bb',
        //'@':'./src'
      },
    },
    optimizeDeps:{
      exclude:['vue']
    },
    server: {
      // 使用代理
      proxy: {
        "/remote-team-blue": {
          target: "http://localhost:5002",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/remote-team-blue/, ""),
        },
        "/remote-team-green": {
          target: "http://localhost:5003",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/remote-team-green/, ""),
        },
        "/remote-team-libs": {
          target: "http://localhost:4001",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/remote-team-libs/, ""),
        },
      },
    },

  };

  return userConfig;
});
