const server = require("./server");
const router = require("./router");
const oslog = require("./os");

server.start(router.route);

oslog();


console.log("环境变量：",process.env );