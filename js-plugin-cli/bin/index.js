#!/usr/bin/env node

// "ora": "^6.0.1",
// package.json  type="module"
// 请求 ora 库，用于实现等待动画
import ora from "ora";
import { program } from "commander";// minimist
// 需要全路径
import { initProject } from "../lib/init.js";

function dlTemplate() {
  const spinner = ora("Downloading template...").start();
  spinner.text = "text";
  spinner.warn("warn");
  spinner.info("info");
  spinner.warn("warn");
  spinner.succeed("succeed");
}

dlTemplate();

program
  .command("mirror <template_mirror>")
  .description("set the template mirror")
  .action((tplMirror) => {
    console.log(tplMirror);
  });

program
  .usage("<commands> [options]")
  .command("init <project_name>")
  .description("create a javascript plugin project")
  .action((project) => {
    initProject(project);
  });

program.parse(process.argv);
