import Vue from "vue"
import store from "@/store"
import VueRouter from "vue-router"
import NavBar from "@/components/NavBar.vue"

Vue.use(VueRouter)

// 로그인 가드
const onlyAuthUser = (to, from, next) => {
  if (store.state.isLogin) {
    next()
  } else {
    Vue.prototype.$toast.error("로그인이 필요해요!")
  }
}
// 로그인 가드
// const rejectAuthUser = (to, from, next) => {
//   if (store.state.isLogin === true) {
//     next()
//   } else {
//     next("/mypage")
//   }
// }

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
      default: () => import(/* webpackChunkName: "community" */ "../views/Community/Index.vue"),
    },
    children: [
      {
        path: "/boards",
        name: "Boards",
        component: () => import(/* webpackChunkName: "Boards" */ "../views/Community/Boards.vue"),
      },
      {
        path: "/form",
        name: "Form",
        component: () => import(/* webpackChunkName: "Form" */ "../views/Community/Form.vue"),
      },
    ],
  },
  {
    path: "/regist",
    name: "Regist",
    beforeEnter: onlyAuthUser,
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "regist" */ "../views/Regist.vue"),
    },
  },
  {
    path: "/registhell",
    name: "RegistHell",
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "registhell" */ "../views/Registhell.vue"),
    },
  },
  // {
  //   path: "/community/:document",
  //   name: "Commnunity",
  //   component: () => import("../views/Community.vue"),
  // },

  {
    path: "/mypage",
    name: "Mypage",
    beforeEnter: onlyAuthUser,
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "mypage" */ "../views/Mypage.vue"),
    },
  },
  {
    path: "/detail/:storeId",
    name: "Detail",
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "detail" */ "../views/Detail.vue"),
    },
  },
  {
    path: "/storage",
    name: "Storage",
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "Storage" */ "../views/Storage.vue"),
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    components: {
      default: () => import(/* webpackChunkName: "signup" */ "../views/Auth/SignUp.vue"),
    },
  },
  {
    path: "/detailhello",
    name: "detailhello",
    components: {
      default: () => import(/* webpackChunkName: "signup" */ "../views/Detailhello.vue"),
    },
  },
  {
    path: "*",
    name: "Error",
    components: {
      NavBar,
      default: () => import("../views/Error.vue"),
    },
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
