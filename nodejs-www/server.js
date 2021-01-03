const http = require("http");
const url = require("url");
const util = require("util");
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
        //response.setHeader('Content-Type','text/plain;charset="utf-8"');
        // let type = mime.getType(pathname);
        // if (type === "text/plain") {
        //     type = "text/plain;charset=utf-8";
        // }
        // response.writeHead(200, { "Content-Type": type });
        // response.end(data);
        return data;
    }

    return false;
}

/**
 * 获取 HTTP 请求的正文数据
 * @param {*} request 
 */
function readPostData(request) {

    return new Promise((resolve, reject) => {
        // 定义了一个post变量，用于暂存请求体的信息
        var data = '';
        //var data =[];

        // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        request.on('data', function (chunk) {
            data += chunk;
            //data.push(chunk);
        });

        // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        request.on('end', function () {
            contentType = request.headers["content-type"];
            if (contentType === "application/json") {
                data = JSON.parse(data);
            }
            else if (contentType === "application/x-www-form-urlencoded") {
                data = querystring.parse(data);
            }
            else if (contentType && contentType.includes("multipart/form-data")) {
                data = data;
                if (data && data.includes("filename")) {
                    data = {
                        "filename": "get the file post data"
                    }
                }
            }
            else {
                data = {};
            }

            resolve(data);
        });
    });

}

async function readPostContent(request) {
    const data = await readPostData(request);
    return data;
}

function start(route) {
    async function onRequest(request, response) {
        // 解析url
        var _url = url.parse(request.url, true);
        var pathname = decodeURIComponent(_url.pathname);
        var result;
        console.log(`Request for ${pathname} received.`);

        //post请求
        result = await readPostContent(request);
        if ("{}" !== JSON.stringify(result)) {
            response.end(util.inspect(result));
            return;
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

        // 路由
        result = route(pathname)
        if (result) {
            response.write(result);
            response.write(util.inspect(_url));
            response.end();
            return;
        };



        // 未找到静态资源和路由 响应404
        response.writeHead(404, { "Content-Type": mime.getType(pathname) || "text/plain;charset=utf-8" });
        response.end();
    }

    http.createServer(onRequest).listen(port);
    console.log(`Server has started at port ${port}`);
}

exports.start = start;