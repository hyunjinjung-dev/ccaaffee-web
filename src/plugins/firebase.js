import Vue from "vue"
import firebase from "firebase/app"
import store from "../store/"

import "firebase/auth"
import "firebase/firebase-database"
import "firebase/firestore"
import firebaseConfig from "../../firebaseConfig"

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged((fu) => {
  store.commit("setFireUser", fu)
  console.log(fu)
})

Vue.prototype.$firebase = firebase
