<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
//import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils";

import "ant-design-vue/lib/button/style/index.less";
import AButton from "ant-design-vue/es/button";

import "ant-design-vue/lib/alert/style/index.less";
import AAlert from "ant-design-vue/es/alert";

import "ant-design-vue/lib/badge/style/index.less";
import ABadge from "ant-design-vue/es/badge";


//import "ant-design-vue/lib/message/style/index.less";
//import "ant-design-vue/lib/style/index.less"

const toggleBlueTheme = () => {
  //toggleTheme({ scopeName: "blue" });
};
const toggleDarkBlueTheme = () => {
  //toggleTheme({ scopeName: "dark-blue" });
};
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <button @click="toggleBlueTheme">皮肤切换为blue</button>
  <button @click="toggleDarkBlueTheme">皮肤切换为dark-blue</button>
  <p>
    <a-button type="primary">Primary Button</a-button>
    <a-button>Default Button</a-button>
  </p>
  <a-alert message="Success Text" type="success" />
  <a-badge status="success" />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: var(--app-color);
  background-color: var(--app-background-color);
  margin-top: 60px;
}
</style>
