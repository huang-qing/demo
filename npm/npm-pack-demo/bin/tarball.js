#!/usr/bin/env node

//const { exec } = require("child_process");
import { exec } from "child_process";
import {
  statSync,
  readdirSync,
  writeFileSync,
  existsSync,
  unlinkSync,
  rmdirSync,
  mkdirSync
} from "fs";
//import path from "path";

import pkg from "../package.json" assert { type: "json" };

const ALLLIBNAMES = ["lodash-es", "dayjs"];

//console.log(pkg);
console.log(Array.prototype.slice.call(process.argv, 0));
const libNames = ALLLIBNAMES;

const getUpdateLibNames = () => {
  let names = [];
  if (process.argv) {
    process.argv.forEach((name) => {
      if (name.startsWith("--")) {
        const _name = name.slice(2);
        const isInclude = libNames.find((libName) => {
          return libName === _name.split("@")[0];
        });

        if (isInclude) {
          names.push(_name);
        }
      }
    });

    if (names.length > 0) {
      return names.join(" ");
    }
  }

  return libNames.join(" ");
};

const delDir = (path) => {
  let files = [];
  if (existsSync(path)) {
    files = readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      //判断是否是文件夹
      if (statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        //是文件的话说明是最后一层不需要递归
        unlinkSync(curPath); //删除文件
      }
    });
    rmdirSync(path);
  }
};

const cleanLibsFolder = () => {
  const path = "./libs/";
  try {
    delDir(path);
    mkdirSync(path);
  } catch (e) {
    throw e;
  }
};

const createCommand = () => {
  cleanLibsFolder();
  const libs = getUpdateLibNames();
  console.log(libs);
  return `npm pack ${libs}  --pack-destination="./libs"`;
};

const getTarballLibNames = () => {
  const _path = "./libs/";
  try {
    const libNames = readdirSync(_path);
    if (libNames && libNames.length > 0) {
      return libNames.filter((name) => {
        const stat = statSync(`${_path}${name}`);
        return stat.isFile();
      });
    }
  } catch (e) {
    throw e;
  }
};

const updatePkg = (names = [], fileNames = []) => {
  if (names.length && fileNames.length) {
    names.forEach((name) => {
      const tgz = fileNames.find((fileName) => fileName.includes(`${name}-`));
      pkg.dependencies[name] = `file:libs\\${tgz}`;
    });

    writeFileSync("./package.json", JSON.stringify(pkg, null, "  "));
  }
};

const command = createCommand();

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.log(err.stack);
    console.log("Error code: " + error.code);
    console.log("Signal received: " + error.signal);
  }
  // console.log("stdout: " + stdout);
  // console.log("stderr: " + stderr);

  const fileNames = getTarballLibNames();
  updatePkg(libNames, fileNames);
});
