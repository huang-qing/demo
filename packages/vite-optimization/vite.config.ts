import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { visualizer } from "rollup-plugin-visualizer";
import OptimizationPersist from "vite-plugin-optimize-persist";
import PkgConfig from "vite-plugin-package-config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), PkgConfig(), OptimizationPersist(), visualizer()],

  build: {
    assetsDir: "assets",
    minify: "terser",
    terserOptions: {
      compress: {
        //  打包删除console
        drop_console: true,
        // 打包删除 debugger
        drop_debugger: true,
      },
    },

    rollupOptions: {
      output: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        chunkFileNames: (chunkInfo: any) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split("/")
            : [];
          const fileName =
            facadeModuleId[facadeModuleId.length - 2] || "[name]";
          return `js/${fileName}/[name].[hash].js`;
        },
        // manualChunks: {
        //   lodash: ["lodash-es"],
        //   vue: ["vue", "pinia", "vue-router"],
        //   antdv: ["ant-design-vue", "@ant-design/icons-vue"],
        //   dayjs: ["dayjs"],
        // },
        manualChunks(id) {
          // if (id.includes("node_modules") && id.includes("lodash-es")) {
          //   return "lodash";
          // } else if (id.includes("node_modules") && id.includes("vue")) {
          //   return "vue";
          // } else if (id.includes("node_modules")) {
          //   return "vendor";
          // }

          if (id.includes("node_modules")) {
            if (id.includes("lodash-es")) {
              return "lodash";
            } else if (id.includes("dayjs")) {
              return "dayjs";
            } else if (
              id.includes("ant-design-vue") ||
              id.includes("@ant-design")
            ) {
              return "ant-design-vue";
            } else if (id.includes("vue") || id.includes("pinia")) {
              return "vue";
            } else {
              return "vendor";
            }
          }
        },
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]",
      },
    },
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
