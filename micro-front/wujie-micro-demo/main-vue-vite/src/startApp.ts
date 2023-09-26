import { startApp } from "wujie";
import WujieVue from "wujie-vue3";
const { setupApp, preloadApp, bus} = WujieVue;


// preloadApp({
//   name: "reactx",
//   url: "http://localhost:8002/",
//   //alive:true
//   exec:true,
//   fiber:false
// });


startApp({
  name: "reactx",
  url: "http://127.0.0.1:8002",
  el: document.getElementById("wujie-react"),
});