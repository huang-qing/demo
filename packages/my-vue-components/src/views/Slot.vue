<script setup lang="ts">
import { ref, computed } from "vue";
import { SlotParent } from "../components/slot";
import { registerComponent } from "../components/slot";
import { Select } from "ant-design-vue";
const input = import("../components/slot/InputItem.vue");
const select = Promise.resolve(Select);
registerComponent("text", input);
registerComponent("select", select);

const data = ref<any[]>([
  {
    id: "item1",
    title: "title-item1",
    name: "name-item1",
    value: "value-item1",
    type: "text",
    modelKey: "modelValue",
    attrs: { style: { width: "300px" } },
  },
  {
    id: "item2",
    title: "title-item2",
    name: "name-item2",
    value: "value-item2",
    type: "text",
    attrs: {
      style: { width: "350px" },
    },
    events: {
      change: (value: string) => {
        console.log("item2 on change: " + value);
        data.value[0].value = `cascade change from item2:${value}`;
      },
    },
  },
  {
    id: "item3",
    title: "title-item3",
    name: "name-item3",
    value: "value-item3-1",
    type: "select",
    options: [
      { value: "value-item3-1", label: "a1" },
      { value: "value-item3-2", label: "a2" },
      { value: "value-item3-3", label: "a3" },
    ],
    attrs: { style: { width: "100%" }, allowClear: true },
    modelKey: "value",
  },
]);

const jsonData = computed(() => {
  return JSON.stringify(data.value, null, 2);
});

const onChangeValue = () => {

  data.value.forEach((item, index) => {
   
    item.id = item.id + index;
    item.value = "value-demo-change" + index;
    item.attrs.style = { width: "120px", "font-size": "12px" };
  });
  console.log("slot view value change");
};
</script>

<template>
  <div class="wrap">
    <div>
      <SlotParent :data="data"></SlotParent>
      <div>
        <button @click="onChangeValue">view 改变值</button>
      </div>
    </div>

    <div>
      <div>
        <p>data:</p>
        <pre>{{ jsonData }}</pre>
      </div>
    </div>
  </div>
</template>

<style lang="less">
pre {
  text-align: left;
}
</style>
