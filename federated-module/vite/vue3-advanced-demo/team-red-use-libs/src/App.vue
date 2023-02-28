<script setup async lang="ts">
import { ref } from "vue";
import ProductPage from "./components/ProductPage.vue";
import { ElButton } from "element-plus";

let text = ref("");
const testFMImport = async () => {
  //import BasketInfo from 'team-blue/BasketInfo'
  //import BuyButton from 'team-blue/BuyButton'
  debugger;
  const url = "team-blue/BasketInfo";
  const url2 =
    "http://localhost:5002/assets/__federation_expose_BasketInfo.80f1ad39.js";
  const url3 = "team-libs/lang";
  console.log("testFMImport:");
  let obj = await import("team-libs/lang");
  console.log(obj);
  debugger;
  obj = await obj.default("zh-cn");
  console.log(obj);
  text.value = obj.default.A;
  console.log(text);
};
debugger;
testFMImport();

const changeEn = async () => {
  let obj = await import("team-libs/lang");
  obj = await obj.default("en");
  text.value = obj.default.A;
};
</script>

<template>
  <ProductPage name="porsche" />
  <div>远程引用组件测试</div>
  <div>
    <p>多语言测试：<button @click="changeEn">切换英文</button>{{ text }}</p>
  </div>
</template>

<style scoped></style>
