import Vue from "vue"
import VueRouter from "vue-router"
import NavBar from "@/components/NavBar.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
    },
  },
  {
    path: "/search",
    name: "Search",
    component: {
      NavBar,
      default: () => import(/* webpackChunkName: "about" */ "../views/Search.vue"),
    },
  },
  {
    path: "/map",
    name: "Map",
    component: {
      NavBar,
      default: () => import(/* webpackChunkName: "about" */ "../views/Map.vue"),
    },
  },
  {
    path: "/community",
    name: "Community",
    component: {
      NavBar,
      default: () => import(/* webpackChunkName: "about" */ "../views/Community.vue"),
    },
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: {
      NavBar,
      default: () => import(/* webpackChunkName: "about" */ "../views/Mypage.vue"),
    },
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
