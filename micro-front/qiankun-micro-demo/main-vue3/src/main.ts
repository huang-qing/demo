import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import { registerMicroApps, start, initGlobalState } from "qiankun";

import type { MicroAppStateActions } from "qiankun";

const state = {
  app: "qiankun-micro-host",
  timestamp: 0,
  authToken: "xxxx-xxxx-xxxx",
};
const actions: MicroAppStateActions = initGlobalState(state);
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

registerMicroApps(
  [
    {
      name: "purehtml",
      entry: "//localhost:8001",
      container: "#subapp-viewport",
      //loader,
      activeRule: "/purehtml",
    },
    //   {
    //     name: 'react app', // app name registered
    //     entry: '//localhost:7100',
    //     container: '#yourContainer',
    //     activeRule: '/yourActiveRule',
    //   },
    {
      name: "vue3-vite",
      entry: "//localhost:8002",
      container: "#subapp-viewport",
      activeRule: "/vue3-vite",
      props: state,
    },
    {
      name: "vue3-vite-about",
      // 跳转到子应用的about路由
      entry: "//localhost:8002/vue3-vite/about",
      container: "#subapp-viewport",
      activeRule: "/vue3-vite-about",
      props: state,
    },
    {
      name: "icpx",
      // 跳转到子应用的about路由
      entry: "//localhost:4173",
      container: "#subapp-viewport",
      activeRule: "/icpx",
      props: state,
    },
  ],
  {
    // qiankun 生命周期钩子 - 微应用加载前
    beforeLoad: (app: any) => {
      console.log("before load+++++++++++", app.name);
      return Promise.resolve();
    },
    beforeMount: (app: any) => {
      console.log("before mount----------", app.name);
      return Promise.resolve();
    },
    // qiankun 生命周期钩子 - 微应用挂载后
    afterMount: (app: any) => {
      console.log("after mount============", app.name);
      return Promise.resolve();
    },
    afterUnmount: (app: any) => {
      console.log("after unmount===+++++----", app.name);
      return Promise.resolve();
    },
  }
);

start({
  prefetch: false, // 开启预加载
});

// 模拟状态信息改变业务
setTimeout(function () {
  state.timestamp = 111111;
  actions.setGlobalState(state);
}, 2000);

window.__qiankun_main_vue3 = "__qiankun_main_vue3";
