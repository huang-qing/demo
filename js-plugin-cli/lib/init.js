import fs from "fs-extra";
import ora from "ora";
import inquirer from "inquirer"; //enquirer
import path from "path";

//const __dirname = path.resolve();
//import path from 'path';
/**
 * 1st get the __filename and then __dirname
 * both these CommonJs variables are not in ES modules, as per Node.org
 * we have to replicate with import.meta.url
 */

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initProject(projectName) {
  try {
    const exists = await fs.pathExists(projectName);
    if (exists) {
      console.log(symbols.error, "the project already exists.");
    } else {
      inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "set a global name for javascript plugin",
            default: "default name",
          },
        ])
        .then(async (answers) => {
          const spinner = ora("Initializing project...");
          spinner.start();
          console.log("__dirname:",__dirname);
          const templatePath = path.resolve(__dirname, "../template/");
          // 返回 Node.js 进程的当前工作目录
          const processPath = process.cwd();

          const lcProjectName = projectName.toLowerCase();
          const targetPath = `${processPath}/${lcProjectName}`;

          const exists = await fs.pathExists(templatePath);
          if (exists) {
            try {
              await fs.copy(templatePath, targetPath);
              spinner.text = "Initialize project successful.";
              // 终止等待动画并显示 ✔ 标志
              spinner.succeed();
            } catch (err) {
              console.log(
                symbols.error,
                chalk.red(`Copy template failed. ${err}`)
              );
              process.exit();
            }
          }
        });
    }
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

export const test = 1;
