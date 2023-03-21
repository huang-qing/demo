import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//window.__tag__='wujie-subApp-react';
//debugger;
//测试localStorage，使用反向代理是一定是成功的
//window.__WUJIE_RAW_WINDOW__.__tag__ = "wujie-subApp-react";
//window.__WUJIE_RAW_WINDOW__.localStorage.setItem("wujie-sub-app", "react");
// console.log(
//   "wujie-subApp-react: localStorage",
//   window.__WUJIE_RAW_WINDOW__.localStorage
// );

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
