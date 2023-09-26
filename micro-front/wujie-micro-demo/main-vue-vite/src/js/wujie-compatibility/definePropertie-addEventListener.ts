function useDefinePropertiesReplaceAddEventListener(window: any) {
  var _addEventListener = window.document.addEventListener;

  Object.defineProperties(window.document, {
    addEventListener: {
      get: () => {
        const fn = function (target: any, thisArg: any, argumentsList: any) {
          _addEventListener(target, thisArg, argumentsList);
        };
        return fn;
        //return _addEventListener;
      },
    },
  });
}

useDefinePropertiesReplaceAddEventListener(window);
