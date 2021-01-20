import Vue from "vue"
import firebase from "firebase/app"
import store from "../store/"

import "firebase/auth"
import "firebase/firebase-database"
import "firebase/firestore"
import firebaseConfig from "../../firebaseConfig"

firebase.initializeApp(firebaseConfig)

// functions와 별개로 auth 정보에 변경이 있으면 작동
firebase.auth().onAuthStateChanged((fu) => {
  store.commit("setFireUser", fu)
})

Vue.prototype.$firebase = firebase
