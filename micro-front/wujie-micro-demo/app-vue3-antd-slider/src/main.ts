import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import WujieVue from "wujie-vue3";




const app = createApp(App);

app.use(WujieVue);
app.use(router);
app.mount("#app");

declare global {
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean;
    // 子应用公共加载路径
    __WUJIE_PUBLIC_PATH__: string;
    // 原生的querySelector
    __WUJIE_RAW_DOCUMENT_QUERY_SELECTOR__: typeof Document.prototype.querySelector;
    // 原生的querySelector
    __WUJIE_RAW_DOCUMENT_QUERY_SELECTOR_ALL__: typeof Document.prototype.querySelectorAll;
    // 原生的window对象
    __WUJIE_RAW_WINDOW__: Window;
    // 子应用mount函数
    __WUJIE_MOUNT: () => void;
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void;
    // document type
    Document: typeof Document;
    // img type
    HTMLImageElement: typeof HTMLImageElement;
    // node type
    Node: typeof Node;
    // element type
    Element: typeof Element;
    // htmlElement typeof
    HTMLElement: typeof HTMLElement;
    // anchor type
    HTMLAnchorElement: typeof HTMLAnchorElement;
    // source type
    HTMLSourceElement: typeof HTMLSourceElement;
    // link type
    HTMLLinkElement: typeof HTMLLinkElement;
    // script type
    HTMLScriptElement: typeof HTMLScriptElement;
    EventTarget: typeof EventTarget;
    Event: typeof Event;
    ShadowRoot: typeof ShadowRoot;
    // 注入对象
    $wujie: { [key: string]: any };
  }
  interface HTMLHeadElement {
    _cacheListeners: Map<string, EventListenerOrEventListenerObject[]>;
  }
  interface HTMLBodyElement {
    _cacheListeners: Map<string, EventListenerOrEventListenerObject[]>;
  }
}

// 注释此代码，尝试在主应用中注入监听,不可行
router.afterEach((to, from, failure) => {
  //debugger;
  let isReturn = false;
  if (to.fullPath === from.fullPath || isReturn) {
    return;
  }
  window.$wujie?.bus.$emit("sub-route-change", "vue3", to.path);
});

// router.beforeEach((to, from) => {
//   // ...
//   // 返回 false 以取消导航
//   debugger;
//   window.$wujie;
//   return false
// })

//子应用之间的路由跳转
window.$wujie?.bus.$on("routeChange", ({ subApp, path }: any) => {
  //debugger;
  if (subApp === "vue3") {
    router.push({ path });
  }
});

if(window.$wujie){
  window.localStorage.setItem("app-vue3-wujue","app-vue3-wujue");
  //debugger;
  window.__WUJIE_RAW_WINDOW__.localStorage.setItem("app-vue3-wujue-raw-window","app-vue3-wujue-raw-window");
 
}
