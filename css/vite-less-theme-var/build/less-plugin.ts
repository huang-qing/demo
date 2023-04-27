import variables from "./variables";

let rootFilename: string;
const defaultThemePath = "/src/theme/default/variables.less";

class LessPlugin {
  minVersion: number[];
  _options: any;

  constructor(options) {
    this.minVersion = [3, 0, 0];
    this._options = options;
  }

  install(less, pluginManager, functions) {
    console.log("LessPlugin:install");
    // 注册拜访器，拜访器为一个对象
    pluginManager.addPreProcessor(new ExamplePreProcessor());
    // 注册访问器，访问器为一个对象
    //pluginManager.addVisitor(new ExampleVisitor(less, this._options));
  }

  setOptions() {}

  printUsage() {
    return "";
  }
}

function converTheme(src, parse) {
  //console.log(src);
  parse(
    src,
    { filename: "VARIABLE_OUTPUT_PLUGIN" },
    (err, mixinRoot, imports) => {
      // const rule = mixinRoot.rules[0];
      // node.rules.push(rule);
      //   src += `
      //     @btn-primary-color: var(--ant-btn-primary-color);
      //     @btn-primary-color: orange;
      //     :root {
      //        --app-color: orange;
      //        --app-background-color: gray;
      //        --ant-btn-primary-color: orange;
      //     }
      //     `;

      src += `
        @btn-primary-color: orange;
        `;
    }
  );

  return src;
}

function getRuleValue(less, value) {
  // // 固定值
  // let value = rule.value;
  // // 非固定值
  // if (value.value instanceof Array) {
  //   value = value.value[0]?.value[0];
  // }

  if (value instanceof less.tree.Declaration) {
    value = value.value;
    value = getRuleValue(less, value);
    value;
  } else if (value instanceof less.tree.Value) {
    //debugger;
    value = value.value;
    value = getRuleValue(less, value);
  } else if (value instanceof less.tree.Expression) {
    value = value.value.map((val) => {
      return getRuleValue(less, val);
    });
    value = value.join(" ");
  } else if (value instanceof less.tree.JavaScript) {
    // less 函数类型
    value = value.expression;
  } else if (value instanceof less.tree.Anonymous) {
    value = value.value;
  } else if (value instanceof less.tree.Variable) {
    // less变量类型
    value = value.name;
  } else if (value instanceof less.tree.Dimension) {
    value = `${value.value}${value.unit}`;
  } else if (value instanceof less.tree.Color) {
    // 色值
    const rgb = value.rgb;
    const alpha = value.alpha;
    value = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
  } else if (value instanceof less.tree.Call) {
    let args = value.args;
    if (args[0] instanceof less.tree.JavaScript) {
      args = args[0].expression;
      //args = `~ "${args[0].expression}"`;
    } else {
      //待定
      args = `~ "Call()"`;
    }
    value = `${value.name}(${args})`;
  } else if (value instanceof Array) {
    value = value.map((val) => {
      return getRuleValue(less, val);
    });

    value = value.join(" ");
  }

  return value;
}

function getCss3RuleValue(value) {
  //对less和antd的函数进行转换处理
  const reg = /^color|fade|tint|ceil|hsv|darken|lighten|shade|max/;
  if (reg.test(value)) {
    //value = `~"${value}"`;
    console.log("less fun:", value);
    value = ` ~"color|fade"`;
  }

  return value;
}

function exportcss3Variables(css3Variables) {
  const css3VariablesStr: string[] = [];
  Object.entries(css3Variables).forEach(([key, value]) => {
    //debugger;
    css3VariablesStr.push(`${key} : ${value};`);
  });

  const result = `
  :root {
    ${css3VariablesStr.join("\r\n")}
  }
  `;

  return result;
}

function exportlessVariables(lessVariables) {
  const lessVariablesStr: string[] = [];
  Object.entries(lessVariables).forEach(([key, value]) => {
    //debugger;
    lessVariablesStr.push(`${key} : ${value};`);
  });

  const result = lessVariablesStr.join("\r\n");

  return result;
}

function converAntdTheme(src, less, filename) {
  //console.log(src);
  const parse = less.parse;
  if (
    filename.includes("node_modules/ant-design-vue") &&
    filename.includes("themes/default.less")
  ) {
    const importContent = src.slice(0, src.indexOf("@primary-color"));
    // 截取less的变量定义部分
    const content = src.slice(src.indexOf("@primary-color"));
    parse(content, { filename: "" }, (err, mixinRoot, imports) => {
      const rules = mixinRoot.rules;
      const lessVariables = {};
      const css3Variables = {};

      rules.forEach((rule) => {
        less;
        if (rule instanceof less.tree.Declaration) {
          const key = rule.name;
          const css3Key = key.replace(/@/, "--");
          let value;
          if (key === "@iconfont-css-prefix") {
            return;
          }
          value = getRuleValue(less, rule);
          value = getCss3RuleValue(value);
          lessVariables[key] = `var(${css3Key})`;
          css3Variables[css3Key] = value;
        }
      });

      const css3VariablesString = exportcss3Variables(css3Variables);
      const lessVariablesString = exportlessVariables(lessVariables);
      src = `
      ${importContent}
      // hq: css3 antd var
      ${css3VariablesString}
      // hq: less antd var
      ${lessVariablesString}

      @iconfont-css-prefix : anticon;
          `;
    });
  }
  return src;
}

class ExamplePreProcessor {
  process(src, processArgs) {
    //console.log("LessPlugin - process:", src);
    const filename = processArgs.fileInfo.filename?.replace(/\\/g, "/");
    const less = processArgs.context.pluginManager.less;
    //const parse = less.parse;

    console.log("LessPlugin - processArgs - filename:", filename);

    src = converAntdTheme(src, less, filename);

    // 测试：为初始加载文件，非@import的文件
    // if (processArgs.fileInfo.filename === processArgs.fileInfo.rootFilename) {
    //   rootFilename = processArgs.fileInfo.filename;
    //   if (rootFilename.includes(defaultThemePath)) {
    //     //debugger;
    //     converTheme(src, parse);
    //   }
    // }

    // src += `
    // @btn-primary-color: orange;
    // `;
    return src;
  }
}

class ExampleVisitor {
  _less: any;
  _options: any;
  _visitor: any;

  constructor(less, options) {
    this._less = less;
    this._options = options;
    this._visitor = new less.visitors.Visitor(this);
  }

  run(root, imp) {
    //const variables = root.variables();

    // 测试：新增一个class类型，估计是用法不正确，或者是不支持，报错paths
    // 结论：新增的类型和变量，在addPreProcessor钩子中
    // const { Ruleset, Selector, Element, Combinator, Declaration } =
    //   this._less.tree;
    // const declaration = new Declaration("--app-color", "orange");
    // const newRuleset = new Ruleset(
    //   [new Selector([new Element(new Combinator(" "), ":root")], [])],
    //   [declaration]
    // );

    // if(variables["@btn-primary-color"]){
    //     variables["@btn-primary-color"]
    // }

    //root.rules.push(newRuleset);

    return this._visitor.visit(root);
  }

  //   visitRuleset(node, visitArgs) {
  //     if (rootFilename.includes(defaultThemePath)) {
  //       //   const rule = `:root {
  //       //     --app-color: red;
  //       //     --app-background-color: gray;
  //       //     --ant-btn-primary-color: #fff;
  //       //   }`;
  //       //   this._less.parse(
  //       //     rule,
  //       //     { filename: "VARIABLE_OUTPUT_PLUGIN" },
  //       //     (err, mixinRoot, imports) => {
  //       //       const rule = mixinRoot.rules[0];
  //       //       node.rules.push(rule);
  //       //     }
  //       //   );
  //       //node.rules.push(node.rules[0]);
  //       //   const { Ruleset, Selector, Element, Combinator, Declaration } =
  //       //     this._less.tree;
  //       //   const declaration = new Declaration("--app-color", "orange");
  //       //   return new Ruleset(
  //       //     // new Element('&'),
  //       //     [new Selector(new Element("&"))],
  //       //     [
  //       //       node,
  //       //       new Ruleset(
  //       //         [new Selector([new Element(new Combinator(" "), ":root")], [])],
  //       //         [declaration]
  //       //       ),
  //       //     ]
  //       //   );
  //     }
  //     // 修改逻辑
  //     return node;
  //   }
}

export default LessPlugin;
