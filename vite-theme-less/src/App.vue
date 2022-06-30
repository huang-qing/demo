<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils";
import AButton from "ant-design-vue/es/button";

import 'ant-design-vue/lib/button/style/index.less';
import 'ant-design-vue/lib/message/style/index.less';

const toggleBlueTheme = () => {
  toggleTheme({ scopeName: "blue" });
};
const toggleDarkBlueTheme = () => {
  toggleTheme({ scopeName: "dark-blue" });
};
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <button @click="toggleBlueTheme">皮肤切换为blue</button>
  <button @click="toggleDarkBlueTheme">皮肤切换为dark-blue</button>
  <p>
    <a-button type="primary">antd button</a-button>
    <a-button>antd button</a-button>
  </p>
</template>

<style lang="less">
//@import "./variables.less";
@color: #2c3e50;
@color: #000;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: @color;
  color: @app-color;
  //text-shadow:@app-color-appless;
  background-color:@app-color-appless ;
  margin-top: 60px;
}
</style>
