<template>
  <div class="about">
    <div class="wrapper">
      <h1>This is an about page {{ obj.name }}</h1>
      <p>
        <button @click="click">i++</button>
      </p>
      <p><a-button>ant button</a-button></p>
      <p><a-date-picker></a-date-picker></p>
      <p><HomeFilled /> <LayoutTwoTone /></p>
      <p><AntdIconHome /></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { throttle } from "lodash-es";
import debounce from "lodash-es/debounce";
import { reactive } from "vue";

import "ant-design-vue/es/button/style/css";
import "ant-design-vue/es/date-picker/style/css";
//import AButton from "ant-design-vue/es/button";
//import ADatePicker from "ant-design-vue/lib/date-picker"; // 加载 JS

//import { Button as AButton } from "ant-design-vue";
//import AButton from "ant-design-vue/es/button";
import { Button as AButton, DatePicker as ADatePicker } from "ant-design-vue";

import { HomeFilled, LayoutTwoTone } from "@ant-design/icons-vue";
import { AntdIconHome } from "my-vue-components";
//import HomeFilled from "@ant-design/icons-vue/HomeFilled";
//import LayoutTwoTone from "@ant-design/icons-vue/LayoutTwoTone";
// about.vue 注释测试
console.log("about.vue console.log");

let i = 1;
const obj = reactive({ name: "关于页面", description: "描述" });
//const cloneObj = reactive(cloneDeep(obj));

const click1 = debounce(() => {
  obj.name = "关于页面" + i++;
}, 1000);

const click2 = throttle(() => {
  obj.name = "关于页面" + i++;
}, 1000);

const click = debounce(() => {
  click1();
  click2();
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
