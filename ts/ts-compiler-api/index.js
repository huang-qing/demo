console.log('into');

const ts = require("typescript");

const filename = "./input.ts";
const program = ts.createProgram([filename], {}); // 第二个参数是 compiler options，就是配置文件里的那些

const sourceFile = program.getSourceFile(filename);

debugger;