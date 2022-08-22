<template>
  <div class=".my-full-name">
    <a-input type="text" name="" id="" v-model:value="firstName" />
    <a-input type="text" name="" id="" v-model:value="lastName" />
    {{ fullName }}
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { Input as AInput } from "ant-design-vue";
import "ant-design-vue/es/input/style/css";

const props = defineProps<{
  firstName: string;
  lastName: string;
}>();

// 使用 v-model 实现双向绑定
const emits = defineEmits(["update:firstName", "update:lastName", "change"]);

// const firstName = props.firstName;
// const lastName = props.lastName;

const firstName = ref("huang");
const lastName = ref("qing");

firstName.value = props.firstName;
lastName.value = props.lastName;

const fullName = computed(() => firstName.value + " ::::::" + lastName.value);

// 监听传入值的改变
watchEffect(() => {
  firstName.value = props.firstName;
  lastName.value = props.lastName;
});

// 监听内部的改变
watchEffect(() => {
  emits("update:firstName", firstName.value);
  emits("update:lastName", lastName.value);
  emits("change", { firstName: firstName.value, lastName: lastName.value });
  // 复制内容到剪切板
  navigator.clipboard.writeText(fullName.value);
});

const getFullName = () => fullName;
const setFullName = (fullName: { firstName: string; lastName: string }) => {
  firstName.value = fullName.firstName;
  lastName.value = fullName.lastName;
};

// 暴露方法
defineExpose({
  getFullName,
  setFullName,
});
</script>
<style lang="less" scoped>
.ant-input {
  border: 1px solid rosybrown;
}
</style>
