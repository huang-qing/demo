import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const Vue3View = () => import("../views/Vue3View.vue");
const Vue3MultipleView = () => import("../views/Vue3MultipleView.vue");
const ReactView = () => import("../views/ReactView.vue");
const AllAppView = () => import("../views/Multiple.vue");
const Vue3AboutView= () => import("../views/Vue3AboutView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    {
      path: "/vue3",
      name: "vue3",
      props: true,
      component: Vue3View,
    },
    {
      path: "/vue3About",
      name: "vue3About",
      props: true,
      component: Vue3AboutView,
    },
    {
      path: "/vue3-multiple",
      name: "vue3-multiple",
      props: { id: "uuid1" },
      component: Vue3MultipleView,
    },
    // {
    //   path: "/vue3-uuid1",
    //   name: "vue3-uuid1",
    //   props: { id: "uuid1" },
    //   component: Vue3View,
    // },
    // {
    //   path: "/vue3-uuid2",
    //   name: "vue3-uuid2",
    //   props: { id: "uuid2" },
    //   component: Vue3View,
    // },
    {
      path: "/react",
      name: "react",
      component: ReactView,
    },
    {
      path: "/all",
      name: "all",
      component: AllAppView,
    },
  ],
});

export default router;
