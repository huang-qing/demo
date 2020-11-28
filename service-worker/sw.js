var CACHE_NAME = 'service-worker-demo-site-cache-v2';
var assets = [
    '/',
    '/main.js',
    '/main.css',
    '/github1.png'
];


/**
 * fetch：仅使用缓存
 * @param {*} event 
 */
function useCache(event) {
    event.respondWith(caches.match(event.request));
}

/**
 * fetch：仅使用网络
 * @param {*} event 
 */
function useNetwork(event) {
    event.respondWith(fetch(event.request));
}

/**
 * fetch：网络优先
 * @param {*} event 
 */
function useNetworkFirst(event) {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
}

/**
 * fetch：缓存优先
 * 先尝试在缓存中寻找资源，若不存在，则请求网络资源，同时在网络资源返回时放入缓存
 * 
 * @param {*} event 
 */
function useCacheFirst(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((response) => {
                return response || fetch(event.request).then((response) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
}


/**
 * fetch：使用缓存，并更新资源
 * 优先使用缓存，但同时仍然发起网络请求并更新资源
 * 
 * @param {*} event 
 */
function useCacheAndNetwork(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((response) => {
                const fetchPromise = fetch(event.request).then((response) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
                return response || fetchPromise;
            });
        })
    );
}


/**
 * fetch：首页网络优先，其他缓存优先
 * 
 * @param {*} event 
 */
function useNetworkForHome(event) {
    var request = event.request,
        requestUrl = new URL(request.url);

    //保存最后一次打开的网站首页
    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            return event.respondWith(
                caches.open(CACHE_NAME).then((cache) => {
                    return fetch(event.request)
                        .then((response) => {
                            cache.put(request, response.clone());
                            return response;
                        }).catch(() => {
                            return cache.match(event.request);
                        });
                })
            );
        }
    }


    return event.respondWith(
        // 拦截网络请求并使用缓存，缓存命中，返回缓存资源，否则返回一个实时从网络请求fetch的结果
        caches.match(request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
}


/**
 * install:启动并缓存站点的资源
 */
function installEvent() {

    self.addEventListener('install', function (event) {

        event.waitUntil(
            caches.open(CACHE_NAME)
                .then((cache) => {
                    console.log('opened cache');
                    return cache.addAll(assets);
                })
        );

        sentMessageToClients();
    });
}


/**
 * fetch：缓存加载
 */
function fetchEvent() {

    self.addEventListener('fetch', (event) => {
        //return useNetworkForHome(event);
        return useCacheAndNetwork(event);
    });

}


/**
 * activate：更新
 */
function activateEvent() {

    self.addEventListener('activate', function (event) {

        // 声明缓存白名单，该名单内的缓存目录不会被生成
        var cacheWhitelist = [CACHE_NAME];
        event.waitUntil(
            // 传给 waitUntil() 的 promise 会阻塞其他的事件，直到它完成
            // 确保清理操作会在第一次 fetch 事件之前完成
            caches.keys().then(function (keyList) {
                return Promise.all(keyList.map((key) => {
                    if (cacheWhitelist.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                }));
            })
        );
    });
}

/**
 * message：接受消息
 */
function messageEvent() {
    self.addEventListener('message', function (event) {
        // 接受数据，并填充在 DOM 中
        console.log("SW Received Message: " + event.data);
        event.source.postMessage('reviced client and this message is from sw.js, to source page');
    });
}

/**
 * 使用clients向全部的客户端发送消息
 */
function sentMessageToClients() {
    setInterval(function () {
        self.clients.matchAll().then(clients => {
            var time = (new Date()).getTime();
            clients.forEach(client => {
                client.postMessage('this message is from sw.js, to page all client ' + time);
            });

        })
    }, 2000);

}

self.addEventListener('notificationclick', function (e) {
    var action = e.action;
    console.log(`action tag: ${e.notification.tag}`, `action: ${action}`);

    switch (action) {
        case 'show-book':
            console.log('show-book');
            break;
        case 'contact-me':
            console.log('contact-me');
            break;
        default:
            console.log(`未处理的action: ${e.action}`);
            action = 'default';
            break;
    }


    e.notification.close();

    e.waitUntil(
        // 获取所有clients
        self.clients.matchAll().then(function (clients) {
            if (!clients || clients.length === 0) {
                return;
            }
            clients.forEach(function (client) {
                // 使用postMessage进行通信
                client.postMessage("Notification:" + action);
            });
        })
    );
});


self.addEventListener('push', function (e) {
    var data = e.data;
    if (e.data) {
        data = data.json();
        console.log('push的数据为：', data);
        self.registration.showNotification(data.text);        
    } 
    else {
        console.log('push没有任何数据');
    }
});

installEvent();
fetchEvent();
activateEvent();
messageEvent();
sentMessageToClients();