export default function wujiePlugin() {
  return {
    // 插件名称
    name: "vite:wujie",

    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: "pre",

    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    transform(code, id, opt) {
      // 替换 getTargetValue 方法中的 setFnCacheMap.has(value) 判断
      if (id && id.includes("deps/wujie-vue3.js")) {
        //console.log("before: ", id, opt);
        const funName = "function getTargetValue(target, p)";
        const theReplaceCode = "setFnCacheMap.has(value)";

        const theGetTargetValueFunctionIndex = code.indexOf(funName);
        if (theGetTargetValueFunctionIndex === -1) {
          console.warn("vite-plugin-wujie: not find getTargetValue function");
          return code;
        }
        const theReplaceCodeIndex = code.indexOf(
          theReplaceCode,
          theGetTargetValueFunctionIndex
        );

        //code=code.replace(theReplaceCodeIndex.);

        const _code = `${code.slice(0, theReplaceCodeIndex)}false${code.slice(
          theReplaceCodeIndex + theReplaceCode.length
        )}`;
        //console.log("after: ", _code);
        return _code;
        //return code;
      }
    },
  };
}
