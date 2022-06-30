<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <p>在 public文件夹中 作为静态资源使用</p>
  <iframe
    class="iframe-xmleditor"
    src="/xmlEditor/index.html"
    frameborder="0"
    scrolling="no"
  ></iframe>
  <p>vite node_module 多页面模式</p>
  <iframe
    class="iframe-xmleditor"
    src="xml.html"
    frameborder="0"
    scrolling="no"
  ></iframe>
  <p>vite cdn</p>
  <iframe
    class="iframe-xmleditor"
    src="xml-cdn.html"
    frameborder="0"
    scrolling="no"
  ></iframe>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.iframe-xmleditor {
  display: block;
  width: 50%;
  height: 300px;
  margin: auto;
}
</style>
