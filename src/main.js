import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "./plugins/firebase"
import "./plugins/moment"
import "./plugins/editor"
import "./error"
import naver from "vue-naver-maps"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")

Vue.use(naver, {
  clientID: "kdcdi0nbx0",
  useGovAPI: false, //공공 클라우드 API 사용 (선택)
  subModules: "", // 서브모듈 (선택)
})
