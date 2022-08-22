<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <div>
    <FullName
      ref="fullNameRef"
      v-model:first-name="firstName"
      v-model:last-name="lastName"
      @change="onFullNameChange"
    />
    <button @click="onFullNameTestClick">测试</button>
  </div>
  <div>
    <Menu :data="menuData" :theme="menuTheme"></Menu>
  </div>
  <div>
    <TestJsx></TestJsx>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import FullName from "./components/FullName.vue";
import Menu from "./components/menu";
import type { IMenuItem } from "./components/menu";
import TestJsx from "./components/TestJsx.vue";

import { ref } from "vue";

const fullNameRef = ref();
const firstName = ref("huang in App");
const lastName = ref("qing in App");
const onFullNameChange = (fullName: string) => {
  console.log(fullName);
};

const onFullNameTestClick = () => {
  // firstName.value = "huang in App on click";
  // lastName.value = "qing in App on click";
  //debugger;
  fullNameRef.value.setFullName({
    firstName: "huang in App use setFullName",
    lastName: "qing in App use setFullName",
  });
};

const menuData = ref<IMenuItem[]>([
  {
    id: "1",
    icon: "ConsoleSqlOutlined",
    text: "1",
  },
  {
    id: "2",
    icon: "HomeFilled",
    text: "2",
    children: [
      {
        id: "2-1",
        icon: "HomeFilled",
        text: "2-1",
        children: [
          {
            id: "2-1-1",
            icon: "HomeFilled",
            text: "2-1-1",
          },
          {
            id: "2-1-2",
            icon: "HomeFilled",
            text: "2-1-2",
          },
        ],
      },
      {
        id: "2-2",
        icon: "ConsoleSqlOutlined",
        text: "2-2",
      },
    ],
  },
]);
// light dark
const menuTheme = ref<string>("light");
</script>

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
</style>
