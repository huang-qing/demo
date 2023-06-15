import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//window.__tag__='wujie-subApp-react';
//debugger;
//测试localStorage，使用反向代理是一定是成功的
//window.__WUJIE_RAW_WINDOW__.__tag__ = "wujie-subApp-react";
//window.__WUJIE_RAW_WINDOW__.localStorage.setItem("wujie-sub-app", "react");
// console.log(
//   "wujie-subApp-react: localStorage",
//   window.__WUJIE_RAW_WINDOW__.localStorage
// );

// window.document.addEventListener("keydown",function(e){
//   console.log("react keydown");
//   console.log(e.target);
// })

// function wujieDomKeydownProxy() {
//   if ((window as any).__WUJIE_RAW_WINDOW__) {
//     debugger;
//     var _addEventListener = document.addEventListener;
//     var handler = {
//       apply: function (target: any, thisArg: any, argumentsList: any) {
//         console.log("addEventListener");
//         const type = argumentsList[0];
//         if (type === "keydown") {
//           const fn = function (e: any) {
//             debugger;
//             console.log(e);
//             //var _e = e;
//             var target =
//               (e.target.shadowRoot && e.composed
//                 ? e.composedPath()[0] || e.target
//                 : e.target) || e.path[0];

//             Object.defineProperty(e, "target", {
//               writable: true,
//             });
//             e.target = target;
//             Object.defineProperty(e, "target", {
//               writable: false,
//             });

//             argumentsList[1](e);
//           };

//           if (argumentsList.length === 3) {
//             return target("keydown", fn, argumentsList[3]);
//           }
//           return target("keydown", fn);
//         }
//         return target(...argumentsList);
//       },
//     };

//     document.addEventListener = new Proxy(_addEventListener, handler);
//   }
// }

// wujieDomKeydownProxy();

// 测试异步处理事件 e.target 问题
document.addEventListener("keydown", function (e) {
  console.log("react keydown");
  console.log(e.target);
  // setTimeout(function () {
  //   debugger;
  //   console.log(e.target);
  // }, 0);
});

// document.addEventListener("click", function (e) {
//   console.log("react click");
//   setTimeout(function () {
//     console.log(e.target);
//   }, 0);
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
