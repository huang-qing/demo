

const handlerCallbackMap = new WeakMap();
function useProxyAddEventListener() {
  //保存原始的addEventListener方法
  (window.document as any)._addEventListener = window.document.addEventListener;

  const addEventListenerHandler = {
    apply: function (target: any, thisArg: any, argumentsList: any) {
      console.log("addEventListener");

      const listener = argumentsList[1];
      let callback = listener;
      //对selectionchange事件特殊处理，使用原生的addEventListener
      if (argumentsList[0] === "selectionchange") {
        console.log("onselectionchange");
        handlerCallbackMap.set(listener, callback);
        (window.document as any)._addEventListener(...argumentsList);
        return;
      } else {
        callback = function (e: any) {
          console.log(`into ${e}`);
          listener(e);
        };
        handlerCallbackMap.set(listener, callback);
        return target(argumentsList[0], callback, argumentsList[2]);
      }
    },
  };

  window.document.addEventListener = new Proxy(
    window.document.addEventListener,
    addEventListenerHandler
  );
}

function useProxyRemoveEventListener() {
  // var _removeEventListener = window.document.removeEventListener;

  // const removeEventListenerHandler = {
  //   apply: function (target: any, thisArg: any, argumentsList: any) {
  //     console.log("removeEventListener");
  //     const listener = argumentsList[1];
  //     const callback = handlerCallbackMap.get(listener);
  //     target(argumentsList[0], callback, argumentsList[2]);
  //   },
  // };

  // window.document.removeEventListener = new Proxy(
  //   window.document.removeEventListener,
  //   removeEventListenerHandler
  // );

  const _removeEventListener = window.document.removeEventListener;
  (window.document as any)._removeEventListener = _removeEventListener;
  window.document.removeEventListener = function (
    type: any,
    listener: any,
    options: any
  ) {
    const _listener = handlerCallbackMap.get(listener);
    (window.document as any)._removeEventListener(type, _listener, options);
  };
}

useProxyAddEventListener();
useProxyRemoveEventListener();
