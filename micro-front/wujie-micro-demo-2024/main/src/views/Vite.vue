<template>
  <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
  <WujieVue
    width="100%"
    height="100%"
    name="vite"
    :url="viteUrl"
    :sync="true"
    :plugins="plugings"
  ></WujieVue>
</template>

<script setup>
import hostMap from "../hostMap";

const viteUrl = hostMap("//localhost:7500/");

const plugings = [
  {
    jsBeforeLoaders: [{ content: "window.Antd = window.parent.Antd" }],
  },
];
</script>

<style lang="scss" scoped></style>
