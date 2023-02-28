<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { defineAsyncComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { RouterLink, RouterView } from "vue-router";

//const LibHelloWorld = defineAsyncComponent(() => import("libs/LibHelloWorld"));

function handleJump() {
  window.$wujie?.props.jump({ path: "/react" });
}

function handleJumpToVue3ToAbout() {
  // 跳转的子应用是保活应用并且没有被打开过
  window.$wujie?.props.jump({ path: "/vue3", query: { vue3: "/about" } });

  //子应用 B 已经实例化
  window.$wujie?.bus.$emit("routeChange", {
    subApp: "vue3",
    path: "/about",
  });
}
</script>

<template>
  -------------------------------------------------------
  <div>
    <h2>测试在vue nest 中 自定义字体</h2>
    嵌套的字体将会失效
    <div>
      iconfon字体图标
      <span class="iconfont">&#xe6eb;</span>
      <span class="iconfont">&#xe6f3;</span>
    </div>

    <div>
      fontawesome字体图标
      <span class="fa fa-glass"></span>
      <span class="fa fa-music"></span>
    </div>
  </div>

  ------------------------------------------------------
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  cursor: pointer;
}

nav a:first-of-type {
  border: 0;
}
</style>
