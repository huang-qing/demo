<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils";
import AButton from "ant-design-vue/es/button";

import "ant-design-vue/lib/button/style/index.less";
import "ant-design-vue/lib/message/style/index.less";

const getThemeUuid = () => {
  const link = document.getElementById("theme-link-tag");
  if (link) {
    return link.getAttribute("href")?.split(".").slice(-2, -1) || "";
  }

  return "";
};

const customLinkHref = (href: string) => {
  if (uuid) {
    return href.replace(/.css$/, `.${uuid}.css`);
  }
  return href;
};

const uuid = getThemeUuid();

const toggleBlueTheme = () => {
  toggleTheme({
    scopeName: "blue",
    customLinkHref: customLinkHref,
  });
};
const toggleDarkBlueTheme = () => {
  toggleTheme({
    scopeName: "dark-blue",
    customLinkHref: customLinkHref,
  });
};
</script>

<template>
  <div id="main" class="main">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <button @click="toggleBlueTheme">皮肤切换为blue</button>
    <button @click="toggleDarkBlueTheme">皮肤切换为dark-blue</button>
    <p class="btns">
      <a-button type="primary">antd button</a-button>
      <a-button>antd button</a-button>
    </p>
  </div>
</template>

<style lang="less">
//@import "./variables.less";
@color: #2c3e50;
@color: #000;

// 在这里使用变量，dev环境生效，prod环境不生效，初步判断此组件内不包含#app这个元素，打包机制有所不同
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   // color: @color;
//   color: @app-color;// 打包less异常
//   //text-shadow:@app-color-appless;
//   background-color: @app-bg-color;
//   padding: 3em;
// }

#main {
  background-color: #ffc;
}
</style>

<style lang="less" scoped>
@app-bg-color: #ffe;
#main {
  // background-color: #ffd;
  background-color: @app-bg-color;
}
</style>
