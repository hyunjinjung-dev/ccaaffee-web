import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fireUser: null,
    isLogin: false,
  },
  mutations: {
    setFireUser(state, fu) {
      state.fireUser = fu
    },
    setLogin(state) {
      state.isLogin = true
    },
  },
  actions: {},
  modules: {},
})
