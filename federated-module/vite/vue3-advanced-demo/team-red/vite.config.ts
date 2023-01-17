import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import type { VitePluginFederationOptions } from "@originjs/vite-plugin-federation";
import ElementPlus from "unplugin-element-plus/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const federationOptions: VitePluginFederationOptions = {
    name: "team-red",
    filename: "remoteEntry.js",
    remotes: {
      "team-blue": "http://localhost:5002/assets/remoteEntry.js",
      "team-green": "http://localhost:5003/assets/remoteEntry.js",
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
  };

  return userConfig;
});
