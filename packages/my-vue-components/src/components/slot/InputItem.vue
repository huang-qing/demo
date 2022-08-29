<template>
  <div class="slot-item-input">
    <input type="text" :value="modelValue" @input="onInput" v-bind="attrs" />
    <button @click="onBtnClick">设置值</button>
    <span>
      <pre>{{ jsonAttrs }}</pre>
    </span>
  </div>
</template>

<script lang="ts">
// use normal <script> to declare options
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts" inherit-attrs="false">
// inherit-attrs="false" 不生效
import {
  defineProps,
  ref,
  computed,
  defineEmits,
  defineExpose,
  watchEffect,
  watch,
} from "vue";

const props = defineProps<{
  modelValue: string;
  attrs: any;
}>();

const emits = defineEmits(["update:modelValue", "update:attrs", "change"]);

const onInput = ($event: any) => {
  const value = $event.target.value;
  emits("update:modelValue", value);
  console.log("slot-input-item component value update");
  emits("change", value);
};

const onBtnClick = () => {
  emits("update:modelValue", "input-item button click");
  console.log("slot-input-item component value update by button click");
};

const setValue = (value: string) => {
  emits("update:modelValue", value);
  console.log("slot-input-item component value update by setValue fun");
};

const setAttrs = (object: any) => {
  emits("update:attrs", object);
  console.log("slot-input-item component attrs update by setAttrs fun");
};

const jsonAttrs = computed(() => {
  return JSON.stringify(props.attrs);
});

defineExpose({
  setValue,
  setAttrs,
});
</script>

<style lang="less">
.slot-item-input {
  border: 2px solid rosybrown;
  display: flex;
}
</style>
