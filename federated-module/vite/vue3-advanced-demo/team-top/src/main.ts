import { createApp,defineAsyncComponent } from "vue"
import { createPinia } from 'pinia'
import App from "./App.vue"
import ElementPlus from 'element-plus'
//import 'element-plus/dist/index.css'
debugger;
const app = createApp(App)
const pinia = createPinia()
debugger;
app.use(pinia)
app.use(ElementPlus)

app.mount("#app")
