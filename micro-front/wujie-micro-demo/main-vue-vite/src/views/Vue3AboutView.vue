<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WujieVue
    width="100%"
    height="100%"
    name="vue3About"
    url="http://localhost:8001/about"
    :sync="sync"
    :alive="alive"
    :props="{jump}"
    :prefix="{
    }"
  ></WujieVue>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from "vue-router";
const props = defineProps({
  id: String,
});

const sync = true;
const alive = true;
const router = useRouter();
const jump = (location:string) => {
  router.push(location);
};
</script>
