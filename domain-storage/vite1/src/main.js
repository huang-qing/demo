import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

createApp(App).mount("#app");

//测试localstorage
window.localStorage.setItem("vite1", "vite1");
