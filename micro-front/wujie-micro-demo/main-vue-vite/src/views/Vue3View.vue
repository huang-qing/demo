<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WujieVue
    width="100%"
    height="100%"
    :name="name"
    :url="url"
    :sync="sync"
    :alive="alive"
    :props="{ jump }"
  ></WujieVue>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  id: String,
  path: String,
});

//debugger;
const sync = false;
const alive = true;
const name = "vue3" + (props.id || "");
const url = ref(`http://localhost:8001/${props.path||''}`);

const jump = (location: string) => {
  router.push(location);
};
</script>
