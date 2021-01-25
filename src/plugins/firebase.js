import Vue from "vue"
import store from "../store/"

import firebase from "firebase/app"
import firebaseConfig from "../../firebaseConfig"
import "firebase/auth"
import "firebase/firebase-database"
import "firebase/firebase-firestore"
import "firebase/firebase-storage"

firebase.initializeApp(firebaseConfig)

// functions와 별개로 auth 정보에 변경이 있으면 작동
firebase.auth().onAuthStateChanged((fu) => {
  store.commit("setFireUser", fu)
  store.commit("setLogin")
})

Vue.prototype.$firebase = firebase
