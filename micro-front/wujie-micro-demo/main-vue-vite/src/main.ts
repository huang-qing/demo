// 测试代理addEventListener
//import './js/wujie-compatibility/index'
// 测试代理addEventListener 对子应用 selectionchange 事件的影响
//import './js/wujie-compatibility/proxy-addEventListener'
// 测试replace addEventListener 对子应用 selectionchange 事件的影响
import "./js/wujie-compatibility/replace-addEventListener";

import { createApp } from "vue";
import { createPinia } from "pinia";
import WujieVue from "wujie-vue3";
import { startApp } from "wujie";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import lifecycles from "./lifecycle";

import "./assets/main.css";

const { setupApp, preloadApp, bus} = WujieVue;

// preloadApp({
//   name: "react",
//   url: "http://localhost:8002/",
//   alive:true
// });

// startApp({
//   name: "react",
//   url: "http://localhost:8002/",
//   el: document.getElementById("wujie-react"),
// });



const app = createApp(App);

app.use(WujieVue);
app.use(createPinia());
app.use(ElementPlus);
app.use(router);

app.mount("#app");

// 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
bus.$on("sub-route-change", (name: string, path: string) => {
  //debugger;
  const mainName = `${name}`;
  const mainPath = `/${name}${path === "/" ? "" : path}`;
  const currentName = router.currentRoute.value.name;
  const currentPath = router.currentRoute.value.path;
  //debugger;
  // if (mainName === currentName && mainPath !== currentPath) {
  //   //router.push({ path: mainPath });
  // }
  // //router.replace({ path: mainPath });
  // window.history.replaceState(null, null, mainPath);

  if (mainPath !== currentPath) {
    router.replace({ path: mainPath });
    //window.history.replaceState(mainPath,'', mainPath);
  }
});

window.addEventListener(
  "popstate",
  function () {
    //alert("我监听到了浏览器的返回按钮事件啦"); //根据自己的需求实现自己的功能
  },
  false
);

// 预加载设置

// setupApp({
//   name: "vue3-no-alive",
//   url: "http://localhost:8001/",
//   exec: true,
//   //props,
//   ...lifecycles,
// });

const reactLifecycles = {
  beforeLoad: (appWindow: any) => {
    console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`);
    appWindow.__WUJIE_RAW_WINDOW__.localStorage.setItem(
      "reactLifecycles",
      "beforeLoad"
    );
    const _window = appWindow.__WUJIE_RAW_WINDOW;

    // router.afterEach((to, from, failure) => {
    //   //debugger;
    //   let isReturn = false;
    //   if (to.fullPath === from.fullPath || isReturn) {
    //     return;
    //   }
    //   window.$wujie?.bus.$emit("sub-route-change", "vue3", to.path);
    // });
    // _window.onpopstate = function (event) {
    //   console.log(
    //     "location: " +
    //       document.location +
    //       ", state: " +
    //       JSON.stringify(event.state)
    //   );
    // };
  },
  beforeMount: (appWindow: any) =>
    console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
  afterMount: (appWindow: any) =>
    console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
  beforeUnmount: (appWindow: any) =>
    console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
  afterUnmount: (appWindow: any) =>
    console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
  activated: (appWindow: any) =>
    console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
  deactivated: (appWindow: any) =>
    console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
  loadError: (url: string, e: any) => console.log(`${url} 加载失败`, e),
};

// setupApp({
//   name: "react",
//   url: "http://localhost:8002/",
//   exec: true,
//   //props,
//   ...reactLifecycles,
// });

// setupApp({
//   name: "react",
//   ...lifecycles,
// });

// preloadApp({
//   name: "vue3-no-alive",
//   url: "http://localhost:8001/",
// });

// preloadApp({
//   name: "react",
//   url: "http://localhost:8002/",
// });
window.localStorage.setItem("wujie", "main");

// window.document.addEventListener("keydown",function(e){
//   debugger;
//   console.log("main keydown");
//   console.log(e.target);
// })
