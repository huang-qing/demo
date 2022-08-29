<template>
  <div class="slot-item-input">
    <input type="text" v-model="inputValue" v-bind="attrs" />
    <span>{{ jsonAttrs }}</span>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  defineEmits,
  watchEffect,
  watch,
} from "vue";

const props = defineProps<{
  value: string;
  attrs: any;
}>();

const emits = defineEmits(["update:value"]);

const inputValue = ref(props.value);

const jsonAttrs = computed(() => {
  return JSON.stringify(props.attrs);
});

watch(
  () => props.value,
  () => {
    debugger;
    inputValue.value = props.value;
    console.log('slot-input-item component reinit');
  }
);

watch(
  () => inputValue.value,
  () => {
    debugger;
    emits("update:value", inputValue.value);
    console.log('slot-input-item component value update');
  }
);
</script>

<style lang="less">
.slot-item-input {
  border: 2px solid rosybrown;
  display: flex;
}
</style>
