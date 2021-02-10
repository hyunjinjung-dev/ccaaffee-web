import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fireUser: null,
    user: null,
    isLogin: false,

    sortTags: ["거리순", "평점순", "리뷰순", "신규오픈순"],
    dayOfWeek: ["월", "화", "수", "목", "금", "토", "일"],
    distance: ["100m", "300m", "500m", "1km", "3km"],
    parkingTags: ["무료주차가능", "유료주차가능", "주차불가"],
    offerTags: [
      "커피",
      "디카페인커피",
      "차(茶)",
      "베이커리",
      "디저트",
      "브런치",
      "원두판매",
      // "주류판매",
      "와인",
      "맥주",
      "위스키 外",
    ],
    policyTags: [
      "입장 시 체온 측정",
      "출입자 명부 작성",
      "QR 체크인",
      "손소독제 비치",
      "테이크아웃",
      "유아동반",
      "노키즈존",
      "반려동물동반",
      "랩탑 사용 불가",
      "상업적 사진 촬영 불가",
      "대관",
      "배달",
    ],
    amenityTags: [
      "Wi-Fi",
      "콘센트",
      "높은테이블",
      "단체석",
      "룸",
      "유아의자",
      "화장실 남녀구분",
      "흡연시설",
    ],
    themeTags: [
      "갤러리",
      "북카페",
      "정원",
      "야외좌석",
      "루프탑",
      "한옥",
      "모던",
      "벽돌",
      "오픈콘크리트",
      "가정집",
      "플라워",
      "가든",
      "수영장",
      "오션뷰",
      "리버뷰",
      "마운틴뷰",
      "씨티뷰",
      "일출",
      "일몰",
      "야경",
    ],
  },
  mutations: {
    setFireUser(state, fu) {
      state.fireUser = fu
    },
    setUser(state, userData) {
      state.user = userData
    },
    setLogin(state) {
      state.isLogin = true
    },
    setLogout(state) {
      state.isLogin = false
    },
  },
  actions: {
    // Login && Logout
    login({ commit }) {
      commit("setLogin")
    },
    logout({ commit }) {
      commit("setLogout")
    },
  },
  modules: {},
  getters: {},
})
