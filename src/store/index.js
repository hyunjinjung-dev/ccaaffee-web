import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fireUser: null,
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
      "주류판매",
    ],
    policyTags: ["유아동반", "노키즈존", "반려동물동반", "대관", "테이크아웃", "배달"],
    amenityTags: [
      "Wi-Fi",
      "콘센트",
      "높은테이블",
      "단체석w",
      "룸",
      "유아의자",
      "화장실 남녀구분",
      "흡연시설",
    ],
    themeTags: [
      "루프탑",
      "북카페",
      "정원",
      "야외좌석",
      "한옥",
      "모던",
      "오픈콘크리트",
      "플라워",
      "식물",
      "갤러리",
      "수영장",
      "오션뷰",
      "리버뷰",
      "마운틴뷰",
      "씨티뷰",
    ],
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
