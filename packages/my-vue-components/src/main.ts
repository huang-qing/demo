import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ConsoleSqlOutlined, HomeFilled } from "@ant-design/icons-vue";
import "ant-design-vue/dist/antd.css";

dayjs.extend(utc);
dayjs.extend(timezone);

var a = dayjs("2019-03-06T08:00:00", "YYYY-MM-DDTHH:mm:ss");
console.log(a.format()); //2019-03-06T08:00:00+08:00
console.log(a.utc().format());
console.log(dayjs.tz.guess());
console.log(dayjs().format("Z"));

const app = createApp(App);
app.use(router);
app.mount("#app");
