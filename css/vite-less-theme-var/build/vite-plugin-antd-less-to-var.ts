const fileRegex = /\.(less)$/;

export default function myPlugin() {
  return {
    name: "transform-file",
    load(id: string) {
      //console.log("load - id:", id);
    },
    async transform(src, id: string) {
      //console.log("transform - id:", id);
      //   if (fileRegex.test(id)) {
      //     return {
      //       code: src,
      //       map: null, // 如果可行将提供 source map
      //     };
      //   }
      //E:/demo/vite-less-theme-var/node_modules/ant-design-vue/lib/button/style/index.less
      //   if (
      //     id.includes("node_modules/ant-design-vue") &&
      //     id.includes("/default.less")
      //   ) {
      //     debugger;
      //     return {
      //       code: src,
      //       map: null, // 如果可行将提供 source map
      //     };
      //   }

      return null;
    },
    moduleParsed(moduleInfo) {
      //console.log("moduleParsed - moduleInfo: ", moduleInfo);
    },
    resolveDynamicImport(specifier){
       // console.log("resolveDynamicImport - : ", specifier);
    }
  };
}
