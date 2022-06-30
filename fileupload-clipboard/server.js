const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });
const app = express();
const port = 4000;

app.use("/static", express.static("public"));

//设置跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //用于判断request来自ajax还是传统请求
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   " Origin, X-Requested-With, Content-Type, Accept"
  // );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  //内容类型：如果是post请求必须指定这个属性
  //res.header("Content-Type", "application/json;charset=utf-8");
  //res.header("Content-Type", "multipart/form-data");
  //res.header("Content-Type", "image/png");

  //   res.header(
  //     "Content-Type",
  //     "multipart/form-data;application/json;charset=utf-8"
  //   );
  next();
});

app.get("/", (req, res) => {
  res.send("<html> <body> <h2>Hello World!</h2></body></html>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//app.use('/static', express.static(path.join(__dirname, 'public')))

// app.get("/form", function (req, res, next) {
//   var form = fs.readFileSync("form.html", { encoding: "utf-8" });
//   res.send(form);
// });

app.post("/uploading-single", upload.single("logo"), function (req, res, next) {
  debugger;
  console.log(req.file, req.body);

  res.set({
    "content-type": "application/json;charset=utf-8",
  });
  res.end("success");
});

app.post("/uploading", upload.single("file"), function (req, res, next) {
  debugger;
  console.log(req.file, req.body);

  res.set({
    "content-type": "application/json;charset=utf-8",
  });
  res.end(req.file.filename);
});
