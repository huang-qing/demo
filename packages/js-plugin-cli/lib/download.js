// 请求 ora 库，用于实现等待动画
const ora = require("ora");
// 请求 chalk 库，用于实现控制台字符样式
const chalk = require("chalk");

function dlTemplate() {
    const spinner = ora(chalk.cyan('Downloading template...')).start();
    spinner.text="text";
    spinner.warn("warn");
    spinner.info("info");
    spinner.warn("warn");
    spinner.succeed("succeed");
}



module.exports = dlTemplate;
