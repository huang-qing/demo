import { readdirSync } from "node:fs";
import path from "node:path";
import fs from "node:fs";
import { UserConfig, PluginOption } from "vite";
import { themePreprocessorPlugin } from "@zougt/vite-plugin-theme-preprocessor";
import { defaultsDeep } from "lodash";
import colors from "colors";

const ADDITIONALFILENAME = "app.less";
const THEMEVARIABLESFILENAME = "variables.less";
const PATHRESOLVETO = "../src/theme/";

type IThemeUserConfig = {
  env: IThemeEnvConfig;
  userConfig: UserConfig;
};

type IThemeConfig = {
  additionalDataName: string;
  themesName: string[];
  defaultThemeName: string;
  rootPath: string;
};

type IThemeLoadConfigOptions = {
  defaultThemeName: string;
};

type IThemeEnvConfig = {
  VITE_ENV_THEME_DEFAULT: string;
};

const loadConfig = (options: IThemeLoadConfigOptions) => {
  const dirname = __dirname;
  const { defaultThemeName } = options;
  const config: IThemeConfig = {
    additionalDataName: "",
    themesName: [],
    defaultThemeName: "",
    rootPath: "",
  };

  const themeRootPath = path.resolve(dirname, PATHRESOLVETO);
  let dir;
  try {
    dir = readdirSync(themeRootPath);
  } catch (e) {
    console.log(
      colors.red.underline(
        'project file directory not exist the "src/theme/default" folder!'
      )
    );
    return null;
  }

  if (dir.includes(ADDITIONALFILENAME)) {
    config.additionalDataName = ADDITIONALFILENAME;
  }

  dir.forEach((name) => {
    const themePath = path.resolve(themeRootPath, `./${name}`);
    const stats = fs.statSync(themePath);

    if (stats.isDirectory()) {
      //console.log(name);
      const dir = readdirSync(themePath);
      if (dir.includes(THEMEVARIABLESFILENAME)) {
        config.themesName.push(name);
      }
    }
  });

  config.defaultThemeName =
    defaultThemeName || config.themesName[0] || "default";
  config.rootPath = themeRootPath;

  return config;
};

const addCssAdditionalDataConfig = (
  themeConfig: IThemeConfig,
  userConfig: UserConfig
) => {
  const additionalDataPath = path.join(
    themeConfig.rootPath,
    `./${ADDITIONALFILENAME}`
  );
  const _config: UserConfig = {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "${additionalDataPath}";`,
          javascriptEnabled: true,
        },
      },
    },
  };
  defaultsDeep(userConfig, _config);
};

interface IUserConfig extends UserConfig {
  plugins: PluginOption[];
  optimizeDeps: {
    exclude: string[];
  };
}

const addThemePreprocessorPluginConfig = (
  themeConfig: IThemeConfig,
  userConfig: UserConfig
) => {
  const pluginConfig: UserConfig = {
    plugins: [],
    optimizeDeps: {
      exclude: [],
    },
  };
  defaultsDeep(userConfig, pluginConfig);

  const config = userConfig as IUserConfig;

  config.plugins = [
    ...config.plugins,
    themePreprocessorPlugin({
      less: {
        // 是否启用任意主题色模式，这里不启用
        arbitraryMode: false,
        // 提供多组变量文件
        multipleScopeVars: themeConfig.themesName.map((name) => {
          const _path = path.resolve(
            themeConfig.rootPath,
            `./${name}/${THEMEVARIABLESFILENAME}`
          );
          //console.log(_path);
          return {
            scopeName: name,
            path: _path,
          };
        }),
        //defaultScopeName: themeConfig.defaultThemeName,
        // 在生产模式是否抽取独立的主题css文件，extract为true以下属性有效
        // !!!【注意】这里必须是true
        extract: true,
      },
    }),
  ];

  config.optimizeDeps.exclude = [
    ...config.optimizeDeps.exclude,
    //【注意】 排除 import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"; 在vite的缓存依赖
    // 否则会造成切换失效
    "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils",
  ];
};

const addThemeConfig = (options: IThemeUserConfig) => {
  const { env, userConfig } = options;
  const { VITE_ENV_THEME_DEFAULT: defaultThemeName } = env;
  const themeConfig = loadConfig({ defaultThemeName });
  if (!themeConfig) {
    return;
  }
  if (themeConfig.additionalDataName) {
    addCssAdditionalDataConfig(themeConfig, userConfig);
  }
  if (themeConfig.themesName && themeConfig.themesName.length > 0) {
    addThemePreprocessorPluginConfig(themeConfig, userConfig);
  }
};

export { addThemeConfig };
