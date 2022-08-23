import { createApp } from "vue";
import { createPinia } from "pinia";
//import * as Icons from "@ant-design/icons-vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/svg-icons-register";

import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // 导入插件
import "dayjs/locale/zh-cn"; // 导入本地化语言

dayjs.extend(isLeapYear); // 使用插件
dayjs.locale("zh-cn");


const app = createApp(App);
// const icons: any = Icons;
// for (const i in icons) {
//   app.component(i, icons[i]);
// }

app.use(createPinia());
app.use(router);

app.mount("#app");
