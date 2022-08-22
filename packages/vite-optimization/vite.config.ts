import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { visualizer } from "rollup-plugin-visualizer";
//import { splitVendorChunkPlugin } from "vite";
import progress from "vite-plugin-progress";
import { viteExternalsPlugin } from "vite-plugin-externals";
import vitePluginImp from "vite-plugin-imp";

// vite.config.js
//import Components from "unplugin-vue-components/vite";
// import {
//   AntDesignVueResolver,
//   ElementPlusResolver,
//   VantResolver,
// } from "unplugin-vue-components/resolvers";

// vite-plugin-optimize-persist 这个插件貌似是给2.x版本用的
// import OptimizationPersist from "vite-plugin-optimize-persist";
// import PkgConfig from "vite-plugin-package-config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // PkgConfig(),
    // OptimizationPersist(),
    // Components({
    //   //dts: true,
    //   resolvers: [
    //     AntDesignVueResolver({
    //       // 参数配置可参考：https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/antdv.ts
    //       // 自动引入 ant-design/icons-vue中的图标，需要安装@ant-design/icons-vue
    //       resolveIcons: true,
    //     }),
    //     // example of importing Vant
    //     // (componentName) => {
    //     //   // where `componentName` is always CapitalCase
    //     //   if (componentName.startsWith("@ant-design/icons-vue")) {
    //     //     console.log(componentName);
    //     //     //return { name: componentName.slice(3), from: "vant" };
    //     //   }
    //     // },
    //   ],
    // }),
    // viteExternalsPlugin({
    //   vue: "Vue",
    //   "lodash-es": "_",
    //   dayjs: "dayjs",
    //   //"ant-design-vue": "antd",
    // }),
    vitePluginImp({
      libList: [
        {
          libName: "@ant-design/icons-vue",
          libDirectory: "",
          camel2DashComponentName: false,
        },
        {
          libName: "lodash-es",
          libDirectory: "",
          camel2DashComponentName: false,
        },
      ],
    }),
    progress(),
    //splitVendorChunkPlugin(),
    visualizer(),
  ],

  build: {
    //assetsDir: "assets",
    // minify: "terser",
    // terserOptions: {
    //   compress: {
    //     //  打包删除console
    //     drop_console: true,
    //     // 打包删除 debugger
    //     drop_debugger: true,
    //   },
    // },

    rollupOptions: {
      //treeshake: false,
      //external: ["@ant-design/icons-vue"],
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
        manualChunks: {
          //lodash: ["lodash-es"],
          //vue: ["vue", "pinia", "vue-router"],
          //antdv: ["ant-design-vue", "@ant-design/icons-vue"],
          //dayjs: ["dayjs"],
          //antdv: ["@ant-design/icons-vue"],
        },

        // manualChunks(id) {
        //   // if (id.includes("node_modules") && id.includes("lodash-es")) {
        //   //   return "lodash";
        //   // } else if (id.includes("node_modules") && id.includes("vue")) {
        //   //   return "vue";
        //   // } else if (id.includes("node_modules")) {
        //   //   return "vendor";
        //   // }

        //   if (id.includes("node_modules")) {
        //     if (id.includes("lodash-es")) {
        //       return "lodash";
        //     } else if (
        //       id.includes("ant-design-vue") ||
        //       id.includes("@ant-design")
        //     ) {
        //       return "ant-design-vue";
        //     } else if (id.includes("vue") || id.includes("pinia")) {
        //       return "vue";
        //     } else if (id.includes("dayjs")) {
        //       return "dayjs";
        //     } else {
        //       return "vendor";
        //     }
        //   }
        // },
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]",
      },
    },
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "my-vue-components": "my-vue-components/src",
      // "@ant-design/icons-vue":
      //   "https://unpkg.com/@ant-design/icons-vue@6.1.0/es",
      //"@ant-design/icons-vue": "@ant-design/icons-vue/lib",
    },
  },

  // optimizeDeps: {
  //   include: ["lodash-es", "ant-design-vue"],
  // },
});
