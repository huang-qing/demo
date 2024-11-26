<template>
  <div>
    <HelloWorld msg="Vue3 + vite示例"></HelloWorld>
    <p>
      <a-text>
        <a href="https://github.com/Tencent/wujie">wujie</a>
        是一个基于微前端架构的微前端框架，它支持单页面应用（SPA）和单页面组件（SPC）两种应用类型。
      </a-text>
    </p>

    <p>
      <a-button type="primary" @click="handleOpen">查看源码</a-button>
    </p>

    <p>
      <a-input v-model:value="value" placeholder="Basic usage" />
      <a-input v-model:value.lazy="value" autofocus placeholder="Lazy usage" />
    </p>
    <p>
      <a-radio v-model:checked="checked">Radio</a-radio>
    </p>

    <div>
      <a-button type="primary" @click="showModal">Open Modal</a-button>
      <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from "vue";
import HelloWorld from "../components/HelloWorld.vue";
const value = ref<string>("");
const value1 = ref<string>("");
watch(value, () => {
  console.log(value.value);
});
watch(value1, () => {
  console.log(value1.value);
});

const handleOpen = function () {
  window.open("https://github.com/Tencent/wujie/tree/master/examples/vite");
};

const checked = ref<boolean>(false);

const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
</script>
<style>
:root {
  --host-color: #f16b5f;
}
</style>
