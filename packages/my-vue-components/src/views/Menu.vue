<template>
  <div>
    <Menu :data="menuData" :theme="menuTheme"></Menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Menu from "../components/menu";
import type { IMenuItem } from "../components/menu";

const menuData = ref<IMenuItem[]>([
  {
    id: "1",
    icon: "ConsoleSqlOutlined",
    text: "1",
  },
  {
    id: "2",
    icon: "HomeFilled",
    text: "2",
    children: [
      {
        id: "2-1",
        icon: "HomeFilled",
        text: "2-1",
        children: [
          {
            id: "2-1-1",
            icon: "HomeFilled",
            text: "2-1-1",
          },
          {
            id: "2-1-2",
            icon: "HomeFilled",
            text: "2-1-2",
          },
        ],
      },
      {
        id: "2-2",
        icon: "ConsoleSqlOutlined",
        text: "2-2",
      },
    ],
  },
]);

// light dark
const menuTheme = ref<string>("light");
</script>

<style lang="less"></style>
