//主线程
var worker = new Worker("worker.js");

worker.postMessage({
    msg: 'hello world from worker main'
});

worker.onmessage = function (message) {
    var data = message.data;
    document.querySelector("#text").innerHTML = data.msg;
}

worker.onerror = function (error) {
    console.log(
        error.filename,
        error.lineno,
        error.message
    );
}
