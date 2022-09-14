function registerServiceWorker() {
    if ('serviceWorker' in navigator && navigator.onLine) {
        navigator.serviceWorker
            .register('/sw.js')
            .then(function (registration) {
                // Registrantion was successful
                console.log('ServiceWorker registration successful width scope:', registration.scope);
                sentMessageToServiceWorker();

                askPermission();
                showNotification(registration);
            })
            .catch(function (err) {
                // Registrantion failed
                console.log('ServiceWorker registrantion failed:', err);
            });
    }
}

function receiveServiceWorkerMessageEvent() {
    navigator.serviceWorker.addEventListener('message', function (event) {
        // 接受数据，并填充在 DOM 中
        document.querySelector("#message").innerHTML = event.data;
    });
}

function sentMessageToServiceWorker() {
    navigator.serviceWorker.controller.postMessage("client sent a message to service worker");
}

function askPermission() {
    return new Promise(function (resolve, reject) {
        var permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    }).then(function (permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.');
        }
    });
}

function showNotification(registration) {

    document.querySelector('#github').addEventListener('click', function (e) {
        var title = 'PWA即学即用';
        var options = {
            body: '邀请你一起学习',
            icon: 'github1.png',
            actions: [{
                action: 'show-book',
                title: '去看看'
            }, {
                action: 'contact-me',
                title: '联系我'
            }],
            tag: 'pwa-starter',
            renotify: true
        };
        registration.showNotification(title, options);
    })
}

registerServiceWorker();
receiveServiceWorkerMessageEvent();


