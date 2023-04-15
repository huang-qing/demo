module.exports = {
  processors: [],
  plugins: [],
  extends: "stylelint-config-standard", // 这是官方推荐的方式
  overrides: [
    // {
    //   files: ["*.css", "**/*.css"],
    //   customSyntax: "postcss",
    // },
  ],
  rules: {
    "import-notation": "string",
  },
};
