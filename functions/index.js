const functions = require("firebase-functions")
var admin = require("firebase-admin")
var serviceAccount = require("./key.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().admin.db_url, //"https://ccaaffee-web-default-rtdb.firebaseio.com",
})

const rdb = admin.database() // RealTime Database
const fdb = admin.firestore() // FireStore

// 수정 후 Deploy 필수
// firebase deploy --only functions:"FunctionsName"

// RealTime Database, Firestore : User Save
exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user
  const time = new Date()
  const u = {
    email,
    displayName,
    createdAt: time,
    photoURL,
    level: email === functions.config().admin.email ? 0 : 5,
    visitedAt: time,
    visitCount: 0,
    likeStoreList: [],
    likeStoreCount: 0,
    sentimentStoreList: [],
    sentimentStoreCount: 0,
    firstName: "",
    lastName: "",
    sex: "",
    birth: "",
  }
  await fdb
    .collection("users")
    .doc(uid)
    .set(u)
  u.createdAt = time.getTime()
  await rdb
    .ref("users")
    .child(uid)
    .set(u)
  try {
    await fdb
      .collection("meta")
      .doc("users")
      .update({ count: admin.firestore.FieldValue.increment(1) })
  } catch (e) {
    await fdb
      .collection("meta")
      .doc("users")
      .set({ count: 1 })
  }
})

// RealTime Database, Firestore : User Delete
exports.deleteUser = functions.auth.user().onDelete(async (user) => {
  const { uid } = user
  await rdb
    .ref("users")
    .child(uid)
    .remove()
  await fdb
    .collection("users")
    .doc(uid)
    .delete()
  await fdb
    .collection("meta")
    .doc("users")
    .update({ count: admin.firestore.FieldValue.increment(-1) })
})

exports.incrementBoardCount = functions.firestore
  .document("boards/{bid}")
  .onCreate(async (snap, context) => {
    try {
      await fdb
        .collection("meta")
        .doc("boards")
        .update("count", admin.firestore.FieldValue.increment(1))
    } catch (e) {
      await fdb
        .collection("meta")
        .doc("boards")
        .set({ count: 1 })
    }
  })

exports.decrementBoardCount = functions.firestore
  .document("boards/{bid}")
  .onDelete(async (snap, context) => {
    await fdb
      .collection("meta")
      .doc("boards")
      .update("count", admin.firestore.FieldValue.increment(-1))
  })

// Firestore : Create Review && Total Count Increment
exports.onCreateCafeReview = functions.firestore
  .document("store/{sid}/cafe/{cid}/review/{rid}")
  .onCreate((snap, context) => {
    return fdb
      .collection("store")
      .doc(context.params.sid)
      .collection("cafe")
      .doc(context.params.cid)
      .update({ reviewCount: admin.firestore.FieldValue.increment(1) })
  })

// Firestore : Delete Review && Total Count Decrement
exports.onDeleteCafeReview = functions.firestore
  .document("store/{sid}/cafe/{cid}/review/{rid}")
  .onDelete((snap, context) => {
    return fdb
      .collection("store")
      .doc(context.params.sid)
      .collection("cafe")
      .doc(context.params.cid)
      .update({ reviewCount: admin.firestore.FieldValue.increment(-1) })
  })

// 수정 후 Deploy 필수
// firebase deploy --only functions:"FunctionsName"
