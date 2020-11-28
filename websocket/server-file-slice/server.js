let ws = require('nodejs-websocket')
let fs = require('fs')
let fileName = '';
let PORT = 8888;
let file;

let server = ws.createServer(function (conn) {
    console.log('New connection')
    conn.on("binary", function (inStream) {
        // Empty buffer for collecting binary data
        var data = Buffer.alloc(0);
        console.log(inStream)
        inStream.on("readable", function () {
            var newData = inStream.read()
            if (newData)
                data = Buffer.concat([data, newData], data.length + newData.length);
        })

        inStream.on("end", function () {
            console.log("Received " + data.length + " bytes of binary data")
            console.log(data)
            file = Buffer.concat([file, data], file.length + data.length);
            conn.sendText('receiving');
        })
    })
    conn.on("text", function (str) {

        console.log("Received" + str);
        if (str === 'uploaded') {

            fs.writeFile('./files/' + fileName, file, (err) => {
                if (err) throw err;
                console.log('文件已保存');
                conn.sendText('received');
            });

        }
        else {
            fileName = str;
            file = Buffer.alloc(0);
        }

    })
    conn.on("close", function (code, reason) {
        console.log("connection closed")
    })
    conn.on("error", function (err) {
        console.log("handle err");
        console.log(err);
    })
}).listen(PORT)

console.log('websocket server listening on port ' + PORT);;