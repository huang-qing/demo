const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require("postcss-preset-env");
const stylelint = require("stylelint");
const pxtorem = require("postcss-pxtorem");
const atImport = require("postcss-import");
const cssnano = require("cssnano");
const mixin=require("postcss-mixins");
const path= require("node:path");

module.exports = {
  plugins: [
    stylelint,
    // 要放在postcss-mixins插件之前
    atImport({
      addModulesDirectories: ["node_modules"],
    }),
    mixin({
      //mixinsFiles:"./mixin.css"
      mixinsDir: path.join(__dirname, 'mixins')
    }),
    postcssPresetEnv({
      stage: 0, // 要使用 css 最新的嵌套语法
    }),
    pxtorem,
    autoprefixer,
    //cssnano
  ],
};
