<template>
  <div class="about">
    <h1>{{ text }}</h1>
    <div><button @click="changeText">改变text值</button></div>
    <div>
    <MouseTracker v-slot="{x,y}">Mouse is at {{ x }},{{ y }}</MouseTracker>
  </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from "vue";
// import TheWelcome from "../components/TheWelcome.vue";
import { } from 'vue-router'
import MouseTracker  from '../components/MouseTracker.vue'

const text = ref("This is an about page");
const changeText = () => {
  text.value = "This is an about page, 啊哈!";
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
