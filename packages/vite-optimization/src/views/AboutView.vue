<template>
  <div class="about">
    <div class="wrapper">
      <h1>This is an about page {{ obj.name }}</h1>
      <p>
        <button @click="click">i++</button>
      </p>
      <p><a-button>ant button</a-button></p>
      <p><a-date-picker></a-date-picker></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from "lodash-es";
import { reactive } from "vue";

import AButton from "ant-design-vue/es/button";
import "ant-design-vue/lib/button/style/css";
import ADatePicker from "ant-design-vue/lib/date-picker"; // 加载 JS
import "ant-design-vue/lib/date-picker/style/css";
debugger;
// about.vue 注释测试
console.log("about.vue console.log");

let i = 1;
const obj = reactive({ name: "关于页面", description: "描述" });
//const cloneObj = reactive(cloneDeep(obj));

const click = debounce(() => {
  obj.name = "关于页面" + i++;
}, 1000);
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
