import "./style.css";

import Headroom from "headroom.js";

debugger;
//select your header or whatever element you wish
const header = document.querySelector("body");

const headroom = new Headroom(header);
headroom.init();
console.log("headroom.js:", Headroom);

document.querySelector("#app").innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
