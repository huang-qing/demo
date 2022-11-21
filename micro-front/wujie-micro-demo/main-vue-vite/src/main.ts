import { createApp } from "vue";
import { createPinia } from "pinia";
import WujieVue from "wujie-vue3";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const { setupApp, preloadApp, bus } = WujieVue;
const app = createApp(App);

app.use(WujieVue);
app.use(createPinia());
app.use(ElementPlus);
app.use(router);

app.mount("#app");

// 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
bus.$on("sub-route-change", (name: string, path: string) => {
  debugger;
  const mainName = `${name}`;
  const mainPath = `/${name}${path === "/" ? "" : path}`;
  const currentName = router.currentRoute.value.name;
  const currentPath = router.currentRoute.value.path;
  if (mainName === currentName && mainPath !== currentPath) {
    //router.push({ path: mainPath });
  }
  //router.replace({ path: mainPath });
  window.history.replaceState(null,null,mainPath)
});
