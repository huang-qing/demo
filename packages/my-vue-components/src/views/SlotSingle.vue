<script setup lang="ts">
import { ref, computed } from "vue";
import { SlotParentSingle } from "../components/slot";
import { registerComponent } from "../components/slot";
const input = import("../components/slot/InputItem.vue");
registerComponent("text", input);

const data = ref({
  title: "title-demo",
  name: "name-demo",
  value: "value-demo",
  type: "text",
  attrs: { style: { width: "300px" } },
});

const jsonData = computed(() => {
  return JSON.stringify(data.value, null, 2);
});

const onChangeValue = () => {
  data.value.value = "value-demo-change";
  console.log("slot view value change");
};
</script>

<template>
  <SlotParentSingle :data="data"></SlotParentSingle>
  <div>
    <p>data:</p>
    <pre>{{ jsonData }}</pre>
  </div>
  <div>
    <button @click="onChangeValue">改变值</button>
  </div>
</template>

<style lang="less">
pre {
  text-align: left;
}
</style>
