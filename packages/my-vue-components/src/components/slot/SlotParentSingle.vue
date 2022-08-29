<template>
  <div class="slot-parent">
    <!-- <slot name="header" :title="props.title"></slot>
    <slot if="value" :value="value"></slot> -->
    <component
      v-if="isExistComponent()"
      :is="getItemByType(type)"
      v-model="value"
      v-model:attrs="attrs"
      ref="compRef"
    ></component>
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

const compRef = ref();
const { title, value, name, type, attrs } = toRefs(props.data);

const isExistComponent = () => !!getItemByType(type.value);

const onClick = () => {
  compRef.value.setValue("use component setValue fun set value in view");
  compRef.value.setAttrs({ style: { width: "300px", "font-size": "1.5em" } });
};
</script>

<style lang="less">
.slot-parent {
  border: 2px solid rosybrown;
  padding: 1em;
}
</style>
