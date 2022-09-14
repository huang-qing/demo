#!/usr/bin/env node

const program = require("commander");
const pkg = require("../package.json");
const updateChk = require("../lib/update");
const dlTemplate = require("../lib/download");

program.version(pkg.version, "-v, --version");

program
  .command("upgrade")
  .description("Check the js-plugin-cli version.")
  .action(() => {
    updateChk();
  });

program
  .command("mirror <template_mirror>")
  .description("set the template mirror")
  .action((tplMirror) => {
    console.log(tplMirror);
  });

dlTemplate();

program.parse(process.argv);
