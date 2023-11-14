(function (window) {
  const handlerCallbackMap = new WeakMap();
  //保存原始的addEventListener方法
  (window.document as any)._addEventListener = window.document.addEventListener;
  (window.document as any)._removeEventListener =
    window.document.removeEventListener;

  function useReplaceAddEventListener(window: any) {
    var addEventListener = function (
      type: string,
      listener: EventListener,
      //listener: EventListenerOrEventListenerObject,
      options?: any
    ) {
      //debugger;
      if (type === "selectionchange") {
        handlerCallbackMap.set(listener, listener);
        window.document._addEventListener(type, listener, options);
        return;
      }
      var _listener = function (e: any) {
        //debugger;
        //console.log("into ______listener:" + e.type);
        //todo
        listener(e);
      };
      handlerCallbackMap.set(listener, _listener);
      window.document._addEventListener(type, _listener, options);
    };

    window.document.addEventListener = addEventListener;
  }

  function useReplaceRemoveEventListener(window: any) {
    window.document.removeEventListener = function (
      type: any,
      listener: any,
      options: any
    ) {
      const _listener = handlerCallbackMap.get(listener);
      (window.document as any)._removeEventListener(type, _listener, options);
    };
  }

  useReplaceAddEventListener(window);
  useReplaceRemoveEventListener(window);
})(window);
