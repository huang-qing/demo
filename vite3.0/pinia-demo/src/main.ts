import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

router.beforeResolve((to, from, next) => {
  next();
  //return false;
})


router.beforeEach((to, from, next) => {

  next();
})

//debugger;
// const aboutRouter=router.getRoutes()[0];
// aboutRouter.meta.originPath=aboutRouter.path;
app.use(router)

app.mount('#app')
