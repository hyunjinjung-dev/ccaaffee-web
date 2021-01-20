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
      default: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    },
  },
  {
    path: "/search",
    name: "Search",
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "search" */ "../views/Search.vue"),
    },
  },
  {
    path: "/map",
    name: "Map",
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "map" */ "../views/Map.vue"),
    },
  },
  {
    path: "/community",
    name: "Community",
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "community" */ "../views/Community.vue"),
    },
  },
  {
    path: "/mypage",
    name: "Mypage",
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "mypage" */ "../views/Mypage.vue"),
    },
  },
  {
    path: "/detail",
    name: "Detail",
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "detail" */ "../views/Detail.vue"),
    },
  },
  {
    path: "/signin",
    name: "SignIn",
    components: {
      default: () => import(/* webpackChunkName: "signin" */ "../views/Auth/SignIn.vue"),
    },
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
