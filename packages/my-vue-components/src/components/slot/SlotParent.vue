<template>
  <div class="slot-parent">
    <!-- <slot name="header" :title="props.title"></slot>
    <slot if="value" :value="value"></slot> -->
    <template v-for="(item, index) in data" :key="item.id">
      <component
        :is="getItemByType(item.type)"
        v-model:[getModelKey(item.modelKey)]="item.value"
        v-model:attrs="item.attrs"
        :options="item.options"
        ref="itemRefs"
        v-bind="item.attrs"
        v-on="{...item.events}"
      ></component>
    </template>

    <div>
      <button @click="onClick">使用方法设值</button>
    </div>
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
  toRef,
  toRefs,
  withDefaults,
} from "vue";
import { getItemByType } from "./useitem";

type IProps = {
  title: string;
  name: string;
  value: any;
  type: string;
  attrs?: any;
  options?: any;
  id: string;
  modelKey?: string;
  events?: any;
};

const props = withDefaults(defineProps<{ data: IProps[] }>(), {});
const itemRefs = ref([]);
const getModelKey = (key?: string) => {
  return key || "modelValue";
};

const onClick = () => {
  // compRef.value.setValue("use component setValue fun set value in view");
  // compRef.value.setAttrs({ style: { width: "300px", "font-size": "1.5em" } });
  itemRefs.value.forEach((ref: any, index) => {
    ref.setValue &&
      ref.setValue(
        "use component setValue fun set value in view . index:" + index
      );
    ref.setAttrs &&
      ref.setAttrs({ style: { width: "300px", "font-size": "1.5em" } });
  });
};

// const test = (value) => {
//   window.console.log(value);
// };
</script>

<style lang="less">
.slot-parent {
  border: 2px solid rosybrown;
  padding: 1em;
}
</style>
