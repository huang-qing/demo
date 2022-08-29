<template>
  <div>
    <FullName
      ref="fullNameRef"
      v-model:first-name="firstName"
      v-model:last-name="lastName"
      @change="onFullNameChange"
    />
    <button @click="onFullNameTestClick">测试</button>
  </div>
</template>

<script setup lang="ts">
import FullName from "../components/FullName.vue";

import { ref } from "vue";

const fullNameRef = ref();
const firstName = ref("huang in App");
const lastName = ref("qing in App");
const onFullNameChange = (fullName: string) => {
  console.log(fullName);
};

const onFullNameTestClick = () => {
  // firstName.value = "huang in App on click";
  // lastName.value = "qing in App on click";

  fullNameRef.value.setFullName({
    firstName: "huang in App use setFullName",
    lastName: "qing in App use setFullName",
  });
};
</script>
