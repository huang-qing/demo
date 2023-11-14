<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";



// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
//const valueHtml = ref("<p>hello</p>");
const valueHtml = ref("");
const value1 = ref<number>(0);

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
  }, 1500);
});

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const mode = "default";

//绑定keydown
window.document.addEventListener("keydown", function (e) {
  //debugger;
  console.log("-subApp e:" + e.target);
});

window.document.addEventListener("selectionchange", function (e) {
  console.log("-subApp: selectionchange");
});
</script>

<template>

  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
  <div>
    <input />
  </div>
  <div>
    <div contenteditable="true">wangEdit子应用区域</div>
    
  </div>
</template>

<style scoped></style>
