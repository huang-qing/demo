import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { loadEnv } from "./build";
//import { addThemeConfig } from "./build/theme-config";
//import { env } from "process";
//import "dotenv/config";
import cssVars from "./build/variables";
import antdLessToVar from "./build/vite-plugin-antd-less-to-var";
import LessPlugin from "./build/less-plugin";

const root = path.join(__dirname, "./src");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv({ command, mode });
  const userConfig: UserConfig = {
    plugins: [
      vue(),
      // 测试vite插件：加载antd中theme的default.less ，经测试无法在hook中访问到less中由@import导入的less文件
      //antdLessToVar(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 优先级 globalVars < additionalData(使用字符串加载到文件的顶部) < 加载的less文件  < additionalData(content)使用函数在最后追加 < modifyVars (hack)
          globalVars: {
            //"primary-color": "orange",
          },
          modifyVars: {
            //hack: `true; @import '${root}/variables.less'`,
            //hack: `true; @import './build/variables.less'`,
            // 可以追加变量的定义
            //"@primary-color": "red",
            //'root-entry-name': 'variable',
            //"@success-color":"#000",
            hack: `true; @import '${root}/css/variables.less'`,
          },
          //测试重载less方法： 测试此配置项不生效
          functions: {
            fade2: function () {
              console.log("dddddd");
              return "yellow";
            },
          },
          plugins: [
            //new LessPlugin({})
          ],
          // 最后的;号一定要写，否则会报错
          //additionalData: `@import "./build/variables.less";`,
          //additionalData: `@import "./src/theme/default/variables.less";`,
          // 测试：使用antd的variables特性
          //additionalData: `@import "./src/css/variables.less";`,
          // 测试additionalData函数：加载antd中theme的default.less ，经测试无法访问到less中由@import导入的less文件
          //additionalData: (content, loaderContext) => {
          //   console.log("content:\n", content);
          //   console.log("loaderContext:\n", loaderContext);
          //   return content;
          // },
          // 测试：使用antd的variables特性
          //   additionalData: (content, loaderContext) => {

          //     console.log("content:\n", content);
          //     console.log("loaderContext:\n", loaderContext);
          //     return `
          //       ${content}
          //       @success-color: #000000;
          //     `;
          //   },
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      exclude: [""],
    },
  };

  return userConfig;
});
