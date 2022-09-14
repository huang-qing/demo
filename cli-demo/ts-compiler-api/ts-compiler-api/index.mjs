console.log("into");

import ts from "typescript";

const filename = "./input.ts";
const program = ts.createProgram([filename], {}); // 第二个参数是 compiler options，就是配置文件里的那些

const sourceFile = program.getSourceFile(filename);

debugger;

const inputEvents = Array.from(sourceFile.statements).find(
  (item) => item.name && item.name.text === "IInputEvents"
);

const eventNames = Array.from(inputEvents.members).map((item) => {
  return item.name.text;
});

console.log(eventNames);

const typeChecker = program.getTypeChecker();

const { transformed } = ts.transform(sourceFile, [
  function (context) {
    return function (node) {
        debugger;
      return ts.visitNode(node, visit);
      function visit(node) {
        if (ts.isTypeReferenceNode(node)) {
          const type = typeChecker.getTypeFromTypeNode(node);

          if (type.value) {
            ts.addSyntheticTrailingComment(
              node,
              ts.SyntaxKind.SingleLineCommentTrivia,
              type.value
            );
          }
        }
        return ts.visitEachChild(node, visit, context);
      }
    };
  },
]);
