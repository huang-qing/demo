<template>
  <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->

  <div style="margin-bottom: 60px"></div>

  <div style="width: 600px; height: auto">
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
const name = "ant-slider" + (props.id || "");
const url = ref(`http://localhost:8008/`);

const jump = (location: string) => {
  router.push(location);
};

function wujieElementGetBoundingClientRect_0(appWindow: any) {
  var _getBoundingClientRect =
      appWindow.Element.prototype.getBoundingClientRect,
    _id = appWindow.__WUJIE.id,
    _shadowRoot = window.document.querySelector(
      '[data-wujie-id="' + _id + '"]'
    );

  appWindow.Element.prototype.getBoundingClientRect = new Proxy(
    appWindow.Element.prototype.getBoundingClientRect,
    {
      apply: function (target: any, thisArg: any, argumentsList: any) {
        debugger;
        console.log("Calling function");
        function _getBoundingClientRect() {
          debugger;
          let rect;
          const elemDomRect = target.apply(thisArg, argumentsList);
          rect = {
            bottom: elemDomRect.bottom,
            height: elemDomRect.height,
            left: elemDomRect.left,
            right: elemDomRect.right,
            top: elemDomRect.top,
            width: elemDomRect.width,
            x: elemDomRect.x,
            y: elemDomRect.y,
          };
          if (_shadowRoot) {
            const shadowRootDomRect = _shadowRoot!.getBoundingClientRect();

            rect.left = elemDomRect.left - shadowRootDomRect.left;
            rect.top = elemDomRect.top - shadowRootDomRect.top;
            rect.bottom = shadowRootDomRect.bottom - elemDomRect.bottom;
            rect.right = shadowRootDomRect.right - elemDomRect.right;
            rect.x = rect.left;
            rect.y = rect.top;
          }

          console.log(rect);
          return rect;
        }
        return _getBoundingClientRect();
      },
    }
  );
}

function wujieElementGetBoundingClientRect(appWindow: any) {
  var _getBoundingClientRect =
      appWindow.Element.prototype.getBoundingClientRect,
    _id = appWindow.__WUJIE.id,
    _shadowRoot = window.document.querySelector(
      '[data-wujie-id="' + _id + '"]'
    );

  var _body = appWindow.document.body;
  var _bodyRect = appWindow.document.body.getBoundingClientRect;
  appWindow.Element.prototype.getBoundingClientRect = new Proxy(
    appWindow.Element.prototype.getBoundingClientRect,
    {
      apply: function (target: any, thisArg: any, argumentsList: any) {
        //debugger;
        console.log("Calling function");
        // function _getBoundingClientRect() {
        //   debugger;
        //   let rect;
        //   const elemDomRect = target.apply(thisArg, argumentsList);
        //   rect = {
        //     bottom: elemDomRect.bottom,
        //     height: elemDomRect.height,
        //     left: elemDomRect.left,
        //     right: elemDomRect.right,
        //     top: elemDomRect.top,
        //     width: elemDomRect.width,
        //     x: elemDomRect.x,
        //     y: elemDomRect.y,
        //   };
        //   if (_shadowRoot) {
        //     const shadowRootDomRect = _shadowRoot!.getBoundingClientRect();

        //     rect.left = elemDomRect.left - shadowRootDomRect.left;
        //     rect.top = elemDomRect.top - shadowRootDomRect.top;
        //     rect.bottom = shadowRootDomRect.bottom - elemDomRect.bottom;
        //     rect.right = shadowRootDomRect.right - elemDomRect.right;
        //     rect.x = rect.left;
        //     rect.y = rect.top;
        //   }

        //   console.log(rect);
        //   return rect;
        // }
        // return _getBoundingClientRect();
        let rect;
        if (thisArg === _body) {
          //debugger;
          const rect =
            appWindow.parent.window.document.body.getBoundingClientRect();
          return rect;
        }

        //const a= _bodyRect();
        debugger;
        rect = target.apply(thisArg, argumentsList);
        return rect;
        console.log("rect: ", rect);
        const shadowRootDomRect = _shadowRoot!.getBoundingClientRect();
        console.log("shadowRootDomRect: ", shadowRootDomRect);
        //rect.left=rect.left-(shadowRootDomRect.left||0);

        const left = rect.left;
        Object.defineProperty(rect, "left", {
          writable: true,
        });
        Object.defineProperty(rect, "x", {
          writable: true,
        });
        //e.target = target;
        rect.left = left - 400;
        rect.x = left - 400;
        // Object.defineProperty(e, 'target', {
        //   writable: false,
        // });

        console.log("end: ", rect);
        return rect;
      },
    }
  );
}

function wujieGetVisualViewportZoom2(appWindow: any) {
  var topWindow = appWindow.parent;

  Object.defineProperty(appWindow, "visualViewport", {
    get: function () {
      return topWindow.visualViewport;
    },
  });

  appWindow.document.body.getBoundingClientRect = function () {
    return topWindow.document.body.getBoundingClientRect();
  };
}

function wujieGetVisualViewportZoom(appWindow: any) {
  //var topWindow = appWindow.parent;
  var visualViewport = appWindow.visualViewport;
  //debugger;
  Object.defineProperty(appWindow, "visualViewport", {
    get: function () {
      //debugger;

      var _visualViewport = {
        offsetLeft: visualViewport.offsetLeft,
        offsetTop: visualViewport.offsetTop,
        onscroll: visualViewport.onscroll,
        pageLeft: visualViewport.pageLeft,
        pageTop: visualViewport.pageTop,
        onresize: visualViewport.onresize,
        scale: visualViewport.scale,
        height: appWindow.document.documentElement.clientHeight,
        width: appWindow.document.documentElement.clientWidth,
      };

      return _visualViewport;
    },
  });
}

function wujieDocumentDefaultView(appWindow: any) {
  var topWindow = appWindow.parent;

  Object.defineProperties(appWindow.document, {
    defaultView: {
      get: function () {
        console.log("defaultView");
        return topWindow;
      },
    },
    parentWindow: {
      get: function () {
        return topWindow;
      },
    },
  });
}

// 无法使用defineProperties调整MouseEvent
function wujiePagePositionPlugin2(appWindow: any) {
  var _getBoundingClientRect =
      appWindow.Element.prototype.getBoundingClientRect,
    _id = appWindow.__WUJIE.id,
    _shadowRoot = window.document.querySelector(
      '[data-wujie-id="' + _id + '"]'
    );

  // window.MouseEvent = new Proxy(window.MouseEvent, {
  //   apply: function (target: any, thisArg: any, argumentsList: any) {
  //     debugger;
  //     console.log("Calling MouseEvent function");
  //     const result = target.apply(thisArg, argumentsList);
  //     return result;
  //   },
  //   // get: function (target, property, receiver) {
  //   //   console.log("mouse event position");
  //   //   debugger;
  //   // },
  // });

  // function pageXGet() {
  //   debugger;
  //   console.log("pageX");
  //   // @ts-ignore
  //   const that = this;
  //   const x = that.pageX;
  //   return x;
  // }

  // Object.defineProperties(Event.prototype, {
  //   pageX: {
  //     get: pageXGet,
  //   },
  // });

  // function targetGet() {
  //   console.log("targetGet");
  //   // @ts-ignore
  //   return this.target;
  // }

  // function targetSet(value: any) {
  //   console.log("targetSet");
  //   // @ts-ignore
  //   return this.target;
  // }

  // Object.defineProperty(Event.prototype, "target", {
  //   get: targetGet,
  //   set: targetSet,
  // });

  // function targetPageX() {
  //   console.log("targetPageX");
  //   // @ts-ignore
  //   debugger;
  //   return pageX;
  // }

  // 测试 MouseEvent.prototype pageX
  // @ts-ignore
  //MouseEvent.prototype._pageX = 0;

  // Object.defineProperty(MouseEvent.prototype, "pageX", {
  //   get: function () {
  //     // const that = this;
  //     // console.log("pageX");
  //      debugger;
  //     //return this._pageX;
  //     return ;
  //   },
  //   set: function (value) {
  //     debugger;
  //     this._pageX = value;
  //   },
  //   //writable: true,
  //   configurable: true,
  // });

  // Object.defineProperties(Element.prototype.style,{

  // });

  // Object.defineProperty(HTMLElement.prototype.style, "left", {
  //   set: function (value) {
  //     debugger;
  //     console.log("htmlelement:style",value);
  //     return value;
  //   },
  // });

  // Object.defineProperty(HTMLElement, "prototype", {
  //   //writable: true,
  //   configurable: true,
  // });

  const handler1 = {
    construct(target, args) {
      console.log(`Creating a ${target.name}`);
      // Expected output: "Creating a monster1"

      return new target(...args);
    },
  };

  //HTMLElement.prototype = new Proxy(HTMLElement.prototype, handler1);
}

function wujiePagePositionPlugin(appWindow: any) {
  var _getBoundingClientRect =
      appWindow.Element.prototype.getBoundingClientRect,
    _id = appWindow.__WUJIE.id,
    _shadowRoot = window.document.querySelector(
      '[data-wujie-id="' + _id + '"]'
    );

  var _body = appWindow.document.body;
  var _bodyRect = appWindow.document.body.getBoundingClientRect;
  // appWindow.Element.prototype.getBoundingClientRect = new Proxy(
  //   appWindow.Element.prototype.getBoundingClientRect,
  //   {
  //     apply: function (target: any, thisArg: any, argumentsList: any) {
  //       //debugger;
  //       console.log("Calling function");
  //       // function _getBoundingClientRect() {
  //       //   debugger;
  //       //   let rect;
  //       //   const elemDomRect = target.apply(thisArg, argumentsList);
  //       //   rect = {
  //       //     bottom: elemDomRect.bottom,
  //       //     height: elemDomRect.height,
  //       //     left: elemDomRect.left,
  //       //     right: elemDomRect.right,
  //       //     top: elemDomRect.top,
  //       //     width: elemDomRect.width,
  //       //     x: elemDomRect.x,
  //       //     y: elemDomRect.y,
  //       //   };
  //       //   if (_shadowRoot) {
  //       //     const shadowRootDomRect = _shadowRoot!.getBoundingClientRect();

  //       //     rect.left = elemDomRect.left - shadowRootDomRect.left;
  //       //     rect.top = elemDomRect.top - shadowRootDomRect.top;
  //       //     rect.bottom = shadowRootDomRect.bottom - elemDomRect.bottom;
  //       //     rect.right = shadowRootDomRect.right - elemDomRect.right;
  //       //     rect.x = rect.left;
  //       //     rect.y = rect.top;
  //       //   }

  //       //   console.log(rect);
  //       //   return rect;
  //       // }
  //       // return _getBoundingClientRect();
  //       let rect;
  //       if (thisArg === _body) {
  //         //debugger;
  //         const rect =
  //           appWindow.parent.window.document.body.getBoundingClientRect();
  //         return rect;
  //       }

  //       //const a= _bodyRect();
  //       debugger;
  //       rect = target.apply(thisArg, argumentsList);
  //       return rect;
  //       console.log("rect: ", rect);
  //       const shadowRootDomRect = _shadowRoot!.getBoundingClientRect();
  //       console.log("shadowRootDomRect: ", shadowRootDomRect);
  //       //rect.left=rect.left-(shadowRootDomRect.left||0);

  //       const left = rect.left;
  //       Object.defineProperty(rect, "left", {
  //         writable: true,
  //       });
  //       Object.defineProperty(rect, "x", {
  //         writable: true,
  //       });
  //       //e.target = target;
  //       rect.left = left - 400;
  //       rect.x = left - 400;
  //       // Object.defineProperty(e, 'target', {
  //       //   writable: false,
  //       // });

  //       console.log("end: ", rect);
  //       return rect;
  //     },
  //   }
  //);

  ///MouseEvent.prototype=function(){}
  // MouseEvent.prototype= new Proxy(MouseEvent.prototype,{
  //   get: function (target, property, receiver) {
  //     debugger;
  //   }
  // });

  // MouseEvent= new Proxy(MouseEvent,{
  //   // get: function (target, property, receiver) {
  //   //   debugger;
  //   // }
  // });

  // var _MouseEvent = MouseEvent;

  // Object.defineProperty(MouseEvent, 'prototype', {
  //   writable: true,
  //   configurable: true
  // });

  // MouseEvent.prototype = function (
  //   type: string,
  //   eventInitDict?: MouseEventInit | undefined
  // ) {
  //   debugger;
  //   return _MouseEvent(type, eventInitDict);
  // };

  // Object.defineProperty(MouseEvent.prototype, "pageX", {
  //   writable: true,
  //   configurable: true,
  // });

  // MouseEvent.prototype.pageX = new Proxy(MouseEvent.prototype.pageX, {
  //   get: function (target, property, receiver) {
  //     debugger;
  //   },
  // });

  // MouseEvent.prototype.pageX;
}

function wujieDocumentMoveEventListener(appWindow: any) {
  const _addEventListener = appWindow.document.addEventListener;
  const eventType = ["mousemove"];
  const handler = {
    apply: function (target: any, thisArg: any, argumentsList: any) {
      const _type = argumentsList[0];
      const type = (_type || "").toLowerCase();
      const fn = function (e: any) {
        debugger;
        const HOSTNAME = "wujie-app";
        const curHostName = e?.currentTarget?.host?.tagName.toLowerCase();
        const CLASSNAMES = ["surely-table-drag-ghost-image"];
      };
      const newArgumentsList = [...argumentsList];
      newArgumentsList[1] = fn;
      // if (["mousemove"].includes(type)) {
      //   debugger;
      //   return target(...newArgumentsList);
      // }
      return target(...argumentsList);
    },
  };

  appWindow.document.addEventListener = new Proxy(
    appWindow.document.addEventListener,
    handler
  );
}

function wujieElementMovePosition(element: HTMLElement, appWindow: any) {
  const CLASSNAMES = ["surely-table-drag-ghost-image"];
  if (CLASSNAMES.includes(element?.className)) {
    let left = 0;
    let top = 0;
    let body = appWindow.document.body;
    const getValue = function (
      value: string,
      lastValue: number,
      type: "top" | "left"
    ) {
      const val = Number(value.replace(/px/g, ""));
      const bodyRect = body.getBoundingClientRect();
      let offset = 0;
      if (!isNaN(bodyRect[type])) {
        offset = bodyRect[type].toFixed() - 0;
      }
      if (!isNaN(val)) {
        return val - offset;
      }
      return lastValue;
    };
    const getCSS = function (left: number, top: number) {
      return `left:${left}px;top:${top}px;`;
    };
    Object.defineProperties(element.style, {
      left: {
        set: function (value) {
          left = getValue(value, left, "left");
          this.cssText = getCSS(left, top);
        },
      },
      top: {
        set: function (value) {
          top = getValue(value, top, "top");
          this.cssText = getCSS(left, top);
        },
      },
    });
  }
}

const plugins = [
  {
    jsBeforeLoaders: [
      {
        callback: (appWindow: any) => {
          wujieGetVisualViewportZoom(appWindow);
          wujieDocumentDefaultView(appWindow);
          //wujieElementGetBoundingClientRect(appWindow);
          wujiePagePositionPlugin2(appWindow);
          //wujieDocumentMoveEventListener(appWindow);
        },
      },
    ],
    documentAddEventListenerHook(iframeWindow, type, handler, options) {
      if (type === "mousemove") {
        console.log("documentAddEventListenerHook: mousemove");
        // iframeWindow.document.addEventListener(
        //   type,
        //   function (e, d) {
        //     debugger;
        //     handler(e, d);
        //   },
        //   options
        // );
      }
    },
    appendOrInsertElementHook(
      element: HTMLElement,
      iframeWindow: Window,
      rawElement: HTMLElement
    ) {
      //console.log(element, iframeWindow, rawElement);
      wujieElementMovePosition(element, iframeWindow);
    },
  },
];
</script>
