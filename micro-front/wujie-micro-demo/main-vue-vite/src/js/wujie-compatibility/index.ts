/**
 * wujie  (window/document) addEventListener 事件兼容性处理
 */
(function (window) {
  function wujieDocumentAddKeydownEventListenerProxy(document) {
    const _addEventListener = document.addEventListener;
    const handler = {
      apply: function (target: any, thisArg: any, argumentsList: any) {
        const type = argumentsList[0];
        if (type === 'keydown') {
          const fn = function (e: any) {
            // 解决获取e.path[0]报错的问题
            const composedTarget = e.composed && e.composedPath();
            if (e.target.nodeName.toLowerCase() === 'wujie-app' && isInput(composedTarget[0])) {
              const target =
                (e.target.shadowRoot && e.composed ? e.composedPath()[0] || e.target : e.target) ||
                e.path[0];

              Object.defineProperty(e, 'target', {
                writable: true,
              });
              e.target = target;
              Object.defineProperty(e, 'target', {
                writable: false,
              });
            }
            argumentsList[1](e);
          };

          if (argumentsList.length === 3) {
            return target('keydown', fn, argumentsList[2]);
          }
          return target('keydown', fn);
        }
        //return target(...argumentsList);
        return target(
          argumentsList[0],
          function (e) {
            argumentsList[1](e);
          },
          argumentsList[2],
        );
      },
    };

    // TODO: 暂时去掉dashboard的代理
    const pathName = window.location.pathname;
    if (pathName !== '/Dashboard' && pathName !== '/home') {
      document.addEventListener = new Proxy(_addEventListener, handler);
    }
  }

  function isInput(target) {
    const nodeName = target?.nodeName?.toLowerCase();
    const isInputElem = ['input', 'textarea'].includes(nodeName);
    return target && (isInputElem || target.contentEditable === 'true');
  }

  function wujieWindowAddPonitEventListenerProxy(window) {
    const _window = window;
    const _addEventListener = _window.addEventListener;
    const handler = {
      apply: function (target: any, thisArg: any, argumentsList: any) {
        const _type = argumentsList[0];
        const type = (_type || '').toLowerCase();
        const fn = function (e: any) {
          // 把path属性设置为可修改属性，修复360浏览器报错的bug
          Object.defineProperty(e, 'path', {
            writable: true,
          });
          e.path = e.path || e.composedPath();
          argumentsList[1](e);
        };
        const newArgumentsList = [...argumentsList];
        newArgumentsList[1] = fn;
        if (['pointermove', 'pointerup', 'pointerdown'].includes(type)) {
          return target(...newArgumentsList);
        }
        return target(...argumentsList);
      },
    };

    _window.addEventListener = new Proxy(_addEventListener, handler);
  }

  wujieWindowAddPonitEventListenerProxy(window);
  wujieDocumentAddKeydownEventListenerProxy(window.document);
})(window);
