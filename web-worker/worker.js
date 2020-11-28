//worker线程

var i = 1;

self.onmessage = function (message) {
    debugger;
    var data = message.data,
        i = 1;

    console.log(data);
    setInterval(function () {
        sentMsg();
    }, 1000);

}

async function sentMsg() {
    var response,
        data;

    response = await fetch('./data.json');
    data = await response.json();
    data.msg = data.msg + " count:" + (++i);
    console.log(data);
    postMessage(data);
}

