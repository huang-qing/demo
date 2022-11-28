import { createApp, App as IApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import {
  renderWithQiankun,
  qiankunWindow,
  QiankunProps,
} from "vite-plugin-qiankun/dist/helper";

let instance: IApp;

async function render(props?: any) {
  const { container } = props || "";

  instance = createApp(App);
  instance.use(router);

  instance.mount(
    container ? container.querySelector("#app") : document.getElementById("app")
  );
}

renderWithQiankun({
  bootstrap(props: QiankunProps) {
    //TODO 路由权限合并

    //TODO 用户登录token设置

    console.log("vue3-vite bootstrap");
  },
  mount(props: QiankunProps) {
    //window.qiankunWindow = qiankunWindow;
    props.onGlobalStateChange((state: any, prev: any) => {
      debugger;
      // state: 变更后的状态; prev 变更前的状态
      console.log(state, prev);
      console.log("基座状态更新");
    });
    render(props);
    console.log("vue3-vite mount", props);
  },
  update() {},
  unmount() {
    instance.unmount();
    console.log("vue3-vite unmount");
  },
});

debugger;
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
  console.log("vue3-vite render");
}
