
var fs = require('fs');
var formdata = require('formidable');
const http = require("http");
const url = require("url");
const util = require("util");
const path = require("path");
const querystring = require("querystring");
//cnpm install mime  下载mime模块
const mime = require("mime");
const static = require("./static");

const port = 8899;

async function readStaticFile(request, response) {
    let _url = request.url;
    _url = url.parse(_url);
    let path = decodeURIComponent(_url.pathname);
    if (path === "/") {
        path = '/index.html';
    }
    let data = await static.readStatic(`.${path}`);

    if (data) {
        return data;
    }

    return false;
}

async function onRequest(request, response) {
    var _url = url.parse(request.url, true);
    var pathname = decodeURIComponent(_url.pathname);
    var result;
    //必须是绝对路径
    var uploadDir = path.join(__dirname, "./fileupload");;

    if (request.method.toLowerCase() == 'post') {
        var form = new formdata.IncomingForm();
        form.uploadDir = uploadDir;//指定保存文件的路径，formidable会自动保存文件
        request.files = {};
        request.data = {};
        form.on('field', function (name, value) {
            request.data[name] = value;//这里提取的是键值对数据
        }).on('file', function (name, file) {
            request.files[name] = file;//这里提取上传的文件
        }).on('end', function () {
            request.startTime = new Date();
            //默认保存的文件名是随机串，需要自己重新指定文件名和后缀
            for (var k in request.files) {
                var f = request.files[k];
                fs.renameSync(f.path, uploadDir + "\\" + f.name);
            }
        });
        form.parse(request);
    }
    //请求静态文件
    result = await readStaticFile(request, response);
    if (result) {
        let type = mime.getType(pathname);
        if (type === "text/plain") {
            type = "text/plain;charset=utf-8";
        }
        response.writeHead(200, { "Content-Type": type });
        response.end(result);
        return;
    }

    // 未找到静态资源和路由 响应404
    response.writeHead(404, { "Content-Type": mime.getType(pathname) || "text/plain;charset=utf-8" });
    response.end();

}
//启动服务

http.createServer(onRequest).listen(8999); 
console.log(`Server has started at  127.0.0.1:8999`);