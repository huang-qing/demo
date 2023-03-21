<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { defineAsyncComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import LibHelloWorld from "libs/LibHelloWorld";
import { RouterLink, RouterView } from "vue-router";

//const LibHelloWorld = defineAsyncComponent(() => import("libs/LibHelloWorld"));

function handleJump() {
  //debugger;
  window.$wujie?.props.jump({ path: "/react" });
}

function handleJumpToVue3ToAbout() {
  //debugger;
  // 跳转的子应用是保活应用并且没有被打开过
  window.$wujie?.props.jump({ path: "/vue3", query: { vue3: "/about" } });

  //子应用 B 已经实例化
  window.$wujie?.bus.$emit("routeChange", {
    subApp: "vue3",
    path: "/about",
  });
}

const storageString=JSON.stringify( window.__WUJIE_RAW_WINDOW__.localStorage);
</script>

<template>
  <LibHelloWorld />
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <div>
    <HelloWorld msg="Vite + Vue" />

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

    <div>
      <h3>localStorage</h3>
      {{storageString}}
    </div>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/other">Other</RouterLink>
      <a @click="handleJump">jump to react</a>
      <a @click="handleJumpToVue3ToAbout">jump to vue3/about</a>
    </nav>
  </div>

  <div>
    <h3>嵌套 wujie</h3>
    <div>
      <WujieVue
        width="100%"
        height="100%"
        name="vue3-nest"
        url="http://localhost:8006/"
      ></WujieVue>
    </div>
  </div>

  <RouterView />
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
