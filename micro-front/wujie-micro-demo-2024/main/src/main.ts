import "whatwg-fetch"; // fetch polyfill
import "custom-event-polyfill";
import { createApp } from "vue";

import App from "./App.vue";

import router from "./router";
import WujieVue from "wujie-vue3";
import lifecycles from "./lifecycle";
import plugins from "./plugin";
import Antd from "ant-design-vue";
import Icon from "ant-design-vue/es/icon/index";
// import "ant-design-vue/dist/reset.css";
// import "element-plus/dist/index.css";

import "./style.css";

window.Antd = Antd;

const { setupApp, preloadApp, bus } = WujieVue;

const app = createApp(App);
app.use(WujieVue).use(router).use(Antd).mount("#app");

bus.$on("click", (msg) => window.alert(msg));
// 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
bus.$on("sub-route-change", (name, path) => {
  const mainName = `${name}-sub`;
  const mainPath = `/${name}-sub${path}`;
  const currentName = router.currentRoute.name;
  const currentPath = router.currentRoute.path;
  if (mainName === currentName && mainPath !== currentPath) {
    router.push({ path: mainPath });
  }
});

const degrade =
  window.localStorage.getItem("degrade") === "true" ||
  !window.Proxy ||
  !window.CustomElementRegistry;
const props = {
  jump: (name) => {
    router.push({ name });
  },
};
