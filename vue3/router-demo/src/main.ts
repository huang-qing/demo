import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { defineAsyncComponent } from "vue";
import registerDialogLoadedEvent from "./util/registDialogLoadedEvent";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

// // 测试使用路由守卫获取组件实例
// router.beforeEach((to, from) => {
//   debugger;
//   if(!to){
//     return;
//   }
//   const component: any = to.matched[0]?.components?.default;
//   if (typeof component === "function") {
//     const asyncComponent = defineAsyncComponent(component
//     );
//     asyncComponent.beforeRouteEnter = function (to, from, next) {
//         debugger;
//         next((vm) => {
//           // 通过 `vm` 访问组件实例
//           debugger;
//           window[`_vm_${to.name}`] = vm;
//         });
//       };

//       to!.matched[0]!.components!.default=asyncComponent;
//   }
//   if (component) {
//     component.beforeRouteEnter = function (to, from, next) {
//       debugger;
//       next((vm) => {
//         // 通过 `vm` 访问组件实例
//         debugger;
//         window[`_vm_${to.name}`] = vm;
//       });
//     };
//   }
// });

registerDialogLoadedEvent(router, function (vm) {
  debugger;
  console.log(vm);
  (window as any)._vm = vm;
  // 注意用完后销毁
});
