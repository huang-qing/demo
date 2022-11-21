import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";

// 需要适配qiankuan的子应用路径name
const base = qiankunWindow.__POWERED_BY_QIANKUN__
  ? "/vue3-vite"
  : import.meta.env.BASE_URL;

const router = createRouter({
  history: createWebHistory(base),
  //history: createWebHashHistory(base),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
