// export default {
//     title: 'VitePress Next',
//     description: 'Just playing around.'
//   }

import fs from "fs";
import path from "path";
import { defineConfigWithTheme } from "vitepress";
import type { Config as ThemeConfig } from "@vue/theme";
import baseConfig from "@vue/theme/config";

const nav = [
  {
    text: "API",
    activeMatch: `^/api/`,
    link: "/api/",
  },
];

export const sidebar = {
  "/api/": [
    {
      text: "Global API",
      items: [
        // { text: "Application", link: "/api/application" },
        {
          text: "General",
          link: "/api/general",
        },
      ],
    },
    {
      text: "Composition API",
      items: [
        // { text: "setup()", link: "/api/composition-api-setup" },
        {
          text: "Reactivity: Core",
          link: "/api/reactivity-core",
        },
        {
          text: "Reactivity: Utilities",
          link: "/api/reactivity-utilities",
        },
      ],
    },
  ],
};

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  //lang: 'en-US',
  title: "Vue.js",
  description: "Vue.js - The Progressive JavaScript Framework",
  srcDir: "src",
  srcExclude: ["tutorial/**/description.md"],
  scrollOffset: "header",

  themeConfig: {
    //nav,
    //sidebar,
    footer: {
      license: {
        text: "MIT License",
        link: "https://opensource.org/licenses/MIT",
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} Evan You`,
    },
  },

  markdown: {
    config(md) {},
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false,
    },
    optimizeDeps: {
      include: ["gsap", "dynamics.js"],
      exclude: ["@vue/repl"],
    },
    // @ts-ignore
    ssr: {
      external: ["@vue/repl"],
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ["../.."],
      },
    },
    build: {
      minify: "terser",
      chunkSizeWarningLimit: Infinity,
    },
    json: {
      stringify: true,
    },
    resolve: {
      alias: {
        "./VPNavBarSearch.vue": path.join(
          __dirname,
          "components/search/VPNavBarSearch.vue"
        ),
      },
    },
  },

  vue: {
    reactivityTransform: true,
  },
});
