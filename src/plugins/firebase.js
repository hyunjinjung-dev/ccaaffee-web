import Vue from "vue"
import store from "../store/"

import firebase from "firebase/app"
import firebaseConfig from "../../firebaseConfig"
import "firebase/auth"
import "firebase/firebase-database"
import "firebase/firebase-firestore"
import "firebase/firebase-storage"

firebase.initializeApp(firebaseConfig)
let unsubscribe = null

// functions와 별개로 auth 정보에 변경이 있으면 작동
// firebase.auth().onAuthStateChanged((fu) => {
//   store.commit("setFireUser", fu)
//   store.commit("setLogin")
// })

Vue.prototype.$firebase = firebase

// Auth 정보에 변경이 있으면
// fu가 있으면 : fireUser 세팅
// fu가 없으면 : fireUser, user 초기화
firebase.auth().onAuthStateChanged((fu) => {
  if (!fu) {
    // user 정보가 없을 경우
    store.commit("setFireUser", null)
    store.commit("setUser", null)
    store.dispatch("logout")
    if (unsubscribe) {
      unsubscribe()
    }
    return
  }
  // user 정보가 있을 경우
  store.commit("setFireUser", fu)
  subscribe(fu)
  store.dispatch("login")
})

// 위 onAuthStateChanged 에서 "subscribe(fu)"를 통해
// fu.uid에 해당하는 user정보를 firestore에서 가져와서 세팅
const subscribe = (fu) => {
  const ref = firebase
    .firestore()
    .collection("users")
    .doc(fu.uid)
  unsubscribe = ref.onSnapshot((doc) => {
    if (doc.exists) {
      store.commit("setUser", doc.data())
    }
  }, console.error)
}
