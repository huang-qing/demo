import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
//import "dotenv/config";
import { themePreprocessorPlugin } from "@zougt/vite-plugin-theme-preprocessor";
//import Components from "unplugin-vue-components/vite";
//import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { loadEnv } from "./build";
import { addThemeConfig } from "./build/theme-config";
//import { env } from "process";

const root = path.join(__dirname, "./src");
const isDev=true;

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if(isDev){
    return getSampleViteConfig();
  }
  const env = loadEnv({ command, mode });
  const userConfig: UserConfig = {
    plugins: [
      vue(),
      // Components({
      //   resolvers: [AntDesignVueResolver({ importStyle: "less" })],
      // }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // hack的方式加载的不仅有variables,还有样式
            //hack: `true; @import '${root}/variables.less'`,
            //hack: `true; @import '${root}/theme/app.less'`,
            // 可以追加变量的定义
            //"@app-color":'#3a7a9e',
            //"@app-bg-color": "#0dbc79",
          },
          // 最后的;号一定要写，否则会报错
          //additionalData: `@import "${root}/theme/app.less";`,
          javascriptEnabled: true,
        },
      },
    },
  };

  //return getSampleViteConfig();
  addThemeConfig({ env: env, userConfig });

  return userConfig;
});

function getSampleViteConfig() {
  return {
    plugins: [
      vue(),
      themePreprocessorPlugin({
        less: {
          // 是否启用任意主题色模式，这里不启用
          arbitraryMode: false,
          // 提供多组变量文件
          multipleScopeVars: [
            {
              // 必需
              scopeName: "blue",
              path: path.resolve("src/theme/blue/variables.less"),
            },
            {
              scopeName: "dark-blue",
              path: path.resolve("src/theme/dark-blue/variables.less"),
            },
          ],
          defaultScopeName: "dark-blue",
          // 在生产模式是否抽取独立的主题css文件，extract为true以下属性有效
          // !!!【注意】这里必须是true
          extract: true,
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // hack的方式加载的不仅有variables,还有样式
            //hack: `true; @import '${root}/theme/variables.less'`,
            //hack: `true; @import '${root}/theme/app.less'`,
            // 可以追加变量的定义
            //"@app-color":'#3a7a9e',
            //"@app-bg-color": "#0dbc79",
          },
          // 最后的;号一定要写，否则会报错
          additionalData: `@import "${root}/theme/app.less";`,
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      //【注意】 排除 import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"; 在vite的缓存依赖
      // 否则会造成切换失效
      exclude: ["@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"],
    },
  };
}
