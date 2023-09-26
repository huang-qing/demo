<template>
  <div class="about">
    <h1>{{ text }}</h1>
    <div><button @click="changeText">改变text值</button></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TheWelcome from "../components/TheWelcome.vue";
import { } from 'vue-router'

const text = ref("This is an other page");
const changeText = () => {
  text.value = "This is an other page, 啊哈!";
};
defineExpose({
  getText: function () {
    return text.value;
  },
  changeText
});
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
