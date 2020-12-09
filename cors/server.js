const express = require('express');
const app = express();
const port = 1000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => { console.log(`Example app listening on port ${port}!`) });


//服务器1
let app1 = express();
app1.use(express.static(__dirname));
app1.get("/get", function (req, res) {
    res.end("I love you 3000");
});
app1.listen(3000,() => { console.log(`Example app listening on port 3000!`) })

//服务器2

let app2 = express();

let whiteList=["http://localhost:3000"];



app2.use(function(req,res,next){
    let origin=req.headers.origin;
    if(whiteList.includes(origin)){
        // 设置那个源可以访问我，参数为 * 时，允许任何人访问，但是不可以和 cookie 凭证的响应头共同使用
        res.setHeader("Access-Control-Allow-Origin", origin);
        // 想要获取 ajax 的头信息，需设置响应头
        res.setHeader("Access-Control-Allow-Headers", "name");
        // 处理复杂请求的头
        res.setHeader("Access-Control-Allow-Methods", "PUT");
        // 允许发送 cookie 凭证的响应头
        res.setHeader("Access-Control-Allow-Credentials", true);
        // 允许前端获取哪个头信息
        res.setHeader("Access-Control-Expose-Headers", "name");
        // 处理 OPTIONS 预检的存活时间，单位 s
        res.setHeader("Access-Control-Max-Age", 5);
        // 发送 PUT 请求会做一个试探性的请求 OPTIONS，其实是请求了两次，当接收的请求为 OPTIONS 时不做任何处理
        if (req.method === "OPTIONS") {
            res.end();
        }
    }
    next();
});


app2.get("/get", function (req, res) {
    res.end("I love you 4000");
});

app2.listen(4000,() => { console.log(`Example app listening on port 4000!`) })