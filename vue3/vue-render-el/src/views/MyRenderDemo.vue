<template>
  <div>
    <div id="container">container</div>
    <br />
    <div id="container-2">container2</div>
    <div>
      <Teleport to="#placeholder1">
        <ElInput :placeholder="placeholder"></ElInput>
      </Teleport>
    </div>
    <div>
      <MySlot></MySlot>
      <MySlot> my slot 默认插槽里的内容 {{ value }}</MySlot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  h,
  createVNode,
  render,
  ref,
  reactive,
  getCurrentInstance,
  watch,
  defineComponent,
} from "vue";

import {
  ElButton,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElSwitch,
} from "element-plus";

import MySlot from "../components/MySlot.vue";
import { mountSoltVnode } from "../components/MyRender";

const value = ref("start text");
const placeholder = ref("输入框占位文本");
const message = ref("this is a message.");
const checked = ref<boolean | string | number>(false);
const appEl = document.querySelector("#app")!;
const placeholder1El = document.querySelector("#placeholder1")!;
const placeholder2El = document.querySelector("#placeholder2")!;
const bodyEl = document.body;

setTimeout(() => {
  console.log("into");
  value.value = "text update";
  message.value = "this is a message on change";
  placeholder.value = "input placeholder";
  checked.value = true;
  console.log(message);
}, 2000);

const instance = getCurrentInstance()!;

const useElMessageBox = () => {
  onMounted(() => {
    ElMessageBox({
      title: value.value,
      // Should pass a function if VNode contains dynamic props
      message: () =>
        h(ElSwitch, {
          modelValue: checked.value,
          "onUpdate:modelValue": (val: boolean | string | number) => {
            checked.value = val;
          },
        }),
    });
  });
};

const useMySlotRender = () => {
  const MySlotRender = defineComponent({
    setup(this, props, { slots }) {
      return () => {
        return h("h4", {}, ["MySlotRender", slots.default!()]);
      };
    },
  });
  const elInputRender = () =>
    h(ElInput, {
      placeholder: placeholder.value,
      modelValue: value.value,
      "onUpdate:modelValue": (val: string) => {
        value.value = val;
      },
    });
  const divRender = () => h("div", "hello");

  const elSwitchRender = () => {
    return h(ElSwitch, {
      modelValue: checked.value,
      "onUpdate:modelValue": (val: boolean | string | number) => {
        checked.value = val;
      },
    });
  };
  const vnode = h(MySlotRender, null, {
    default: elSwitchRender,
  });

  onMounted(() => {
    render(vnode, placeholder2El);
  });
};

const useMountSoltVnode = () => {
  const inputRender = () =>
    h(ElInput, {
      placeholder: placeholder.value,
      modelValue: value.value,
      "onUpdate:modelValue": (val: string) => {
        value.value = val;
      },
    });
  const render = () => {
    return h(ElSwitch, {
      modelValue: checked.value,
      "onUpdate:modelValue": (val: boolean | string | number) => {
        checked.value = val;
      },
    });
  };
  onMounted(() => {
    const el = document.querySelector("#container");
    mountSoltVnode(null, inputRender, el, null);
  });
};

useElMessageBox();
useMySlotRender();
useMountSoltVnode();
</script>
