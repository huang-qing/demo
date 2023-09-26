<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
  <WujieVue
    width="100%"
    height="100%"
    :name="name"
    :url="url"
    :sync="sync"
    :alive="alive"
    :props="{ jump }"
    :plugins="plugins"
  ></WujieVue>

  <div id="contenteditable-container">
    <div contenteditable="true">主框架区域</div>
    <div><button @click="removeSelectionchangeEvent">移除selectionchange事件</button> <button @click="removeKeydownEvent">移除keydown事件</button></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  id: String,
  path: String,
});

//debugger;
const sync = false;
const alive = true;
const name = "wangedit" + (props.id || "");
const url = ref(`http://localhost:8007/`);
// const plugins = [
//   {
//     jsBeforeLoaders: [
//       {
//         callback: (appWindow: any) => {
//           debugger;
//           Object.defineProperties(appWindow, {
//             Selection: {
//               get: () => {
//                 debugger;
//                 return appWindow.__WUJIE.degrade
//                   ? appWindow.__WUJIE.document.defaultView.Selection
//                   : appWindow.parent.Selection;
//               },
//             },
//             DataTransfer: {
//               get: () =>
//                 appWindow.__WUJIE.degrade
//                   ? appWindow.__WUJIE.document.defaultView.DataTransfer
//                   : appWindow.parent.DataTransfer,
//             },
//           });

//           //appWindow.activeElement = {};
//           // Object.defineProperties(appWindow.document.activeElement, {
//           //   shadowRoot: {
//           //     get: () => {
//           //       debugger;
//           //       console.log('into shadowRoot');
//           //       return appWindow.__WUJIE ? true : false;
//           //     },
//           //   },
//           // });

//           // Object.defineProperties(appWindow.document, {
//           //   activeElement: {
//           //     get: (a, b) => {
//           //       debugger;
//           //       console.log("----------------into shadowRoot");
//           //       //return appWindow.__WUJIE ? true : false;
//           //       if (appWindow.__WUJIE) {
//           //         appWindow.document.activeElement.shadowRoot = true;
//           //       }
//           //       return appWindow.document.activeElement;
//           //     },
//           //   },
//           // });

//           Object.defineProperties(appWindow.document, {
//             activeElement: {
//               value: {
//                 ...appWindow.document.activeElement,
//                 shadowRoot: appWindow.__WUJIE ? true : false,
//               },
//             },
//           });
//         },
//       },
//     ],
//     // jsLoader: (code: any) => {
//     //   debugger;
//     //   return code
//     //     .replace(
//     //       "e instanceof t.Node",
//     //       "e instanceof (window.__WUJIE.degrade ? window.Node : t.Node)"
//     //     )
//     //     .replace("n.isCollapsed", "n.baseOffset === n.focusOffset")
//     //     .replace("n.collapsed", "n.startOffset === n.endOffset");
//     // },
//   },
// ];

const jump = (location: string) => {
  router.push(location);
};

// 测试在子应用里代理对 selectionchange 事件的影响
function wujieDomKeydownProxy(window: any) {
  var _addEventListener = window.document.addEventListener;
  var handler = {
    apply: function (target: any, thisArg: any, argumentsList: any) {
      console.log("addEventListener");
      return target(
        argumentsList[0],
        function (e: any) {
          console.log(`------into----proxy ${e.type}`);
          argumentsList[1](e);
        },
        argumentsList[2]
      );
    },
  };

  window.document.addEventListener = new Proxy(_addEventListener, handler);
}

const plugins = [
  {
    jsBeforeLoaders: [
      {
        callback: (appWindow: any) => {
          debugger;
          Object.defineProperties(appWindow, {
            Selection: {
              get: () => {
                debugger;
                return appWindow.__WUJIE.degrade
                  ? appWindow.__WUJIE.document.defaultView.Selection
                  : appWindow.parent.Selection;
              },
            },
            DataTransfer: {
              get: () =>
                appWindow.__WUJIE.degrade
                  ? appWindow.__WUJIE.document.defaultView.DataTransfer
                  : appWindow.parent.DataTransfer,
            },
          });

          Object.defineProperties(appWindow.document, {
            activeElement: {
              value: {
                ...appWindow.document.activeElement,
                shadowRoot: appWindow.__WUJIE ? true : false,
              },
            },
          });

          //测试proxy
          //wujieDomKeydownProxy(appWindow);
        },
      },
    ],
  },
];

// 测试添加事件
const selectionchangeHandler = function (e) {
  console.log("-main: selectionchange");
};
const keydownHandler = function () {
  console.log("-main: keydown");
};
window.document.addEventListener("selectionchange", selectionchangeHandler);
window.document.addEventListener("keydown", keydownHandler);


const removeSelectionchangeEvent=function(){
  window.document.removeEventListener("selectionchange",selectionchangeHandler);
}

const removeKeydownEvent=function(){
  window.document.removeEventListener("keydown",keydownHandler);
}


</script>
