<template>
  <div class="slot-parent">
    <slot name="header" :title="props.title"></slot>
    <slot if="value" :value="value"></slot>
    <component
      v-if="isExistComponent()"
      :is="getItemByType(type)"
      v-model="value"
      :attrs="attrs"
    ></component>
    <div></div>
  </div>
</template>
<script setup lang="ts">
import {
  defineProps,
  ref,
  onMounted,
  watchEffect,
  watch,
  WatchStopHandle,
} from "vue";
import { getItemByType } from "./useitem";

type IProps = {
  title: string;
  name: string;
  value: string;
  type: string;
  attrs: any;
};

const props = defineProps<{ data: IProps }>();
const emits = defineEmits(["update:data"]);

const title = ref();
const name = ref();
const value = ref();
const type = ref();
const attrs = ref();
let vModelWatchStopHandle: WatchStopHandle | null;

const init = () => {
  debugger;
  const data = props.data;
  title.value = data.title;
  name.value = data.name;
  value.value = data.value;
  type.value = data.type;
  attrs.value = data.attrs;
};

const bindPropsUpdateWatch = () => {
  watch(
    () => props.data,
    () => {
      debugger;
      if (vModelWatchStopHandle) {
        vModelWatchStopHandle();
        vModelWatchStopHandle = null;
      }
      init();
      console.log("slot-parent component reinit");
      bindVModelWatch();
    },
    { deep: true }
  );
};

const bindVModelWatch = () => {
  if (!vModelWatchStopHandle) {
    vModelWatchStopHandle = watch(
      () => value.value,
      () => {
        debugger;
        emits("update:data", {
          title: title.value,
          name: name.value,
          value: value.value,
          type: type.value,
          attrs: attrs.value,
        });
        console.log("slot-parent component data update");
      }
    );
  }
};

const isExistComponent = () => !!getItemByType(type.value);

init();

bindPropsUpdateWatch();
bindVModelWatch();
</script>

<style lang="less">
.slot-parent {
  border: 2px solid rosybrown;
  padding: 1em;
}
</style>
