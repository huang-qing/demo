<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WujieVue
    width="100%"
    height="100%"
    name="vue3-multiple-1"
    url="http://localhost:8001/"
    :sync="sync"
    :alive="alive"
  ></WujieVue>
  
  <WujieVue
    width="100%"
    height="100%"
    name="vue3-multiple-2"
    url="http://localhost:8001/"
    :sync="sync"
    :alive="alive"
  ></WujieVue>

  <WujieVue
    width="100%"
    height="100%"
    name="vue3-multiple-3"
    url="http://localhost:8001/"
    :sync="sync"
    :alive="alive"
  ></WujieVue>
</template>

<script setup lang="ts">
const sync = true;
const alive = true;
</script>
