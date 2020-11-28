const HIJACK_EVENTS_NAME = /^(hashchange|popstate)$/i;
// 创建两个队列，使用数组实现
const EVENTS_POOL = {
    hashchange: [],
    popstate: []
};

debugger;
// window.addEventListener('hashchange', function () {
//     console.log("hashchange");
//     loadApp();
// });
window.addEventListener('popstate', function () {
    console.log("popstate");
    debugger;
    history.replaceState({}, null, location.hash.replace(/#/, ""));
    loadApp();
});

const originAddEventListener = window.addEventListener;
const originRemoveEventListener = window.removeEventListener;
window.addEventListener = function (eventName, handler) {
    debugger;
    // 拦截事件绑定方法
    // 监听检测到是 hashchange popstate 类型事件, 而且它们对应的回调函数不存在队列中时候，放入队列中
    if (eventName && HIJACK_EVENTS_NAME.test(eventName) &&
        typeof handler === 'function') {

        EVENTS_POOL[eventName].indexOf(handler) === -1 &&
            EVENTS_POOL[eventName].push(handler);
    }

    return originAddEventListener.apply(this, arguments);
}
window.removeEventListener = function (eventName, handler) {
    if (eventName && HIJACK_EVENTS_NAME.test(eventName)) {
        let eventsList = EVENTS_POOL[eventName];
        //移除事件池中对应的 hashchange popstate 事件
        eventsList.indexOf(handler) > -1 &&
            (EVENTS_POOL[eventName] = eventsList.filter((fn) => fn !== handler));
    }

    return originRemoveEventListener.apply(this, arguments);
}

function mockPopStateEvent(state) {
    return new PopStateEvent('popstate', { state });
}


// 拦截history的方法，因为pushState和replaceState方法并不会触发onpopstate事件
// 所以即便在onpopstate时执行了reroute方法，也要在这里执行下reroute方法。
const originalPushState = window.history.pushState;
const originalReplaceState = window.history.replaceState;
window.history.pushState = function (state, title, url) {
    debugger;
    let result = originalPushState.apply(this, arguments);
    // history.pushState()或history.replaceState()不会触发popstate事件
    // 手动执行触发 popstate 事件
    reRoute(mockPopStateEvent(state));
    return result;
}
window.history.replaceState = function (state, title, url) {
    debugger;
    let result = originalReplaceState.apply(this, arguments);
    reRoute(mockPopStateEvent(state));
    return result;
}

// 执行完load、mount、unmout操作后，执行此函数，就可以保证微前端的逻辑总是第一个执行。
// 然后App中的Vue或React相关Router就可以收到Location的事件了。

export function callCapturedEvents(eventArgs) {
    if (!eventArgs) {
        return;
    }

    if (!Array.isArray(eventArgs)) {
        eventArgs = [eventArgs];
    }

    let name = eventArgs[0].type;

    if (!HIJACK_EVENTS_NAME.test(name)) {
        return;
    }

    EVENTS_POOL[name].forEach((handler) => {
        handler.apply(window, eventArgs);
    });
}

// 每次监听到路由变化，调用reRoute函数
// 这样每次路由切换，最先知道变化的是基座
// 等基座同步执行完（阻塞）后，就可以由子应用的vue-Rourer或者react-router-dom等库去接管实现单页面逻辑了
function reRoute(popstate) {
    debugger;
    //invoke([],arguments);

}

const Apps = [];
export function registryApp(entry, activeRule) {
    Apps.push({
        entry,
        activeRule
    });
}

//根据传入的规则去判断是否需要此时挂载
function shouldBeActive(app) {
    return app.activeRule(window.location);
}

export async function loadApp() {
    debugger;
    const shouldMountApp = Apps.filter(shouldBeActive);
    if (!(shouldMountApp && shouldMountApp.length > 0)) {
        return;
    }
    console.log(shouldMountApp[0], 'shouldMountApp');

    //可以参考微前端和第三方库的源码,例如import-html-entry这个库
    fetch(shouldMountApp[0].entry)
        .then(function (response) {
            //response.json();
            return response.text();
        })
        .then(function (text) {
            const dom = document.createElement('div')
            dom.innerHTML = text;
            console.log(dom, 'dom');

            const content = dom.querySelector('h1');
            const subapp = document.querySelector('#subApp');
            if (subapp) {
                subapp.innerHTML = '';
                subapp.appendChild(content);
            }

        });
}

export function start() {
    debugger;
    loadApp();
}