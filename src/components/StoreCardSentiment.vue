<template>
  <v-sheet class="pa-1" style="background-color: inherit;">
    <v-menu
      offset-y
      left
      :nudge-top="type == 'mypage' ? '0' : '70'"
      :nudge-left="type == 'mypage' ? '0' : '50'"
      content-class="elevation-0"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" small icon fab @click="loginCheck">
          <v-icon v-if="userSentiment" color="white">
            mdi-pin
          </v-icon>
          <v-icon v-else color="white">
            mdi-pin-outline
          </v-icon>
        </v-btn>
      </template>

      <div v-if="fireUser && type != 'mypage'">
        <div class="white--text font-weight-bold" style="text-align: center;">
          방문하신 적이 있나요?
        </div>
        <v-btn-toggle v-model="userSentiment" style="background-color: inherit;">
          <span v-for="(sentiment, index) in sentiments" :key="index">
            <v-btn icon @click="sentimentSelected(sentiment.id, userSentiment)">
              <v-icon v-if="userSentiment != sentiment.id" color="white">
                {{ sentiment.icon + "-outline" }}
              </v-icon>
              <v-icon v-else color="white">
                {{ sentiment.icon }}
              </v-icon>
            </v-btn>
          </span>
        </v-btn-toggle>
      </div>

      <div v-else-if="fireUser && type == 'mypage'">
        <v-btn-toggle dense v-model="userSentiment" style="background-color: inherit;">
          <span v-for="(sentiment, index) in sentiments" :key="index">
            <v-btn icon @click="sentimentSelected(sentiment.id, userSentiment)">
              <v-icon small v-if="userSentiment != sentiment.id" color="white">
                {{ sentiment.icon + "-outline" }}
              </v-icon>
              <v-icon v-else color="white">{{ sentiment.icon }}</v-icon>
            </v-btn>
          </span>
        </v-btn-toggle>
      </div>
    </v-menu>
  </v-sheet>
</template>

<script>
export default {
  props: ["store", "type"],
  data: () => ({
    userSentiment: null,
    sentiments: [
      {
        id: 0,
        icon: "mdi-close-circle",
        title: "미방문",
      },
      {
        id: 1,
        icon: "mdi-emoticon-sad",
        title: "별로",
        color: "info",
      },
      {
        id: 2,
        icon: "mdi-emoticon-neutral",
        title: "쏘쏘",
        color: "info",
      },
      {
        id: 3,
        icon: "mdi-emoticon-happy",
        title: "만족",
        color: "info",
      },
      {
        id: 4,
        icon: "mdi-emoticon-kiss",
        title: "추천",
        color: "info",
      },
    ],
  }),
  mounted() {
    this.patch()
  },
  computed: {
    fireUser() {
      return this.$store.state.fireUser
    },
  },
  methods: {
    patch() {
      if (this.store.sentimentUserList && this.fireUser) {
        const userSentimentData = this.store.sentimentUserList.find((item) => {
          if (this.fireUser.uid) {
            return item.uid === this.fireUser.uid
          }
        })
        if (userSentimentData) {
          this.userSentiment = userSentimentData.sentiment
        } else {
          this.userSentiment = 0
        }
      }
    },
    loginCheck() {
      if (!this.fireUser) {
        this.$toast.error("로그인이 필요해요")
        this.$store.dispatch("openSignInDialog")
        return
      }
    },
    async sentimentSelected(newVal, oldVal) {
      if (!this.fireUser) {
        this.$toast.error("로그인이 필요해요")
        return
      }
      // 기존 값과 신규 값이 같으면 return
      if (oldVal == newVal) {
        this.$emit("sentimentSelected")
        return
      }
      let refUser = this.$firebase
        .firestore()
        .collection("users")
        .doc(this.fireUser.uid)
      let ref = this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
      try {
        if (oldVal == 0) {
          // 기존 0, 신규 0은 위에서 걸러졌고,
          // 기존 0, 신규 0이 아닐 때,
          // >> 유저의 sentimentStoreList에 업데이트, 카운트 +1
          // >> 카페의 sentimentUserList에 업데이트, 카운트 +1
          let updateUserForm = { storeId: this.store.storeId, sentiment: newVal }
          let updateStoreForm = { uid: this.fireUser.uid, sentiment: newVal }
          const batch = await this.$firebase.firestore().batch()
          batch.update(refUser, {
            sentimentStoreList: this.$firebase.firestore.FieldValue.arrayUnion(updateUserForm),
            sentimentStoreCount: this.$firebase.firestore.FieldValue.increment(1),
          })
          batch.update(ref.collection("cafe").doc(this.store.storeId), {
            sentimentUserList: this.$firebase.firestore.FieldValue.arrayUnion(updateStoreForm),
            sentimentUserCount: this.$firebase.firestore.FieldValue.increment(1),
          })
          await batch.commit()
        } else {
          if (newVal == 0) {
            // >> 기존 0이 아니고, 신규 0일 때,
            // >>>> 유저의 리스트에 기존 내용 삭제, 카운트 -1
            // >>>> 카페의 리스트에 기존 내용 삭제, 카운트 -1
            const batch = await this.$firebase.firestore().batch()
            let removeUserForm = { storeId: this.store.storeId, sentiment: oldVal }
            let removeStoreForm = { uid: this.fireUser.uid, sentiment: oldVal }
            batch.update(refUser, {
              sentimentStoreList: this.$firebase.firestore.FieldValue.arrayRemove(removeUserForm),
              sentimentStoreCount: this.$firebase.firestore.FieldValue.increment(-1),
            })
            batch.update(ref.collection("cafe").doc(this.store.storeId), {
              sentimentUserList: this.$firebase.firestore.FieldValue.arrayRemove(removeStoreForm),
              sentimentUserCount: this.$firebase.firestore.FieldValue.increment(-1),
            })
            await batch.commit()
          } else {
            // >> 기존 0이 아니고, 신규도 0이 아닐 때,
            // >>>> 유저의 리스트에 기존 내용 삭제
            // >>>> 유저의 리스트에 업데이트
            // >>>> 카페의 리스트에 기존 내용 삭제
            // >>>> 카페의 리스트에 업데이트
            const batch = await this.$firebase.firestore().batch()
            let updateUserForm = { storeId: this.store.storeId, sentiment: newVal }
            let updateStoreForm = { uid: this.fireUser.uid, sentiment: newVal }
            let removeUserForm = { storeId: this.store.storeId, sentiment: oldVal }
            let removeStoreForm = { uid: this.fireUser.uid, sentiment: oldVal }

            batch.update(refUser, {
              sentimentStoreList: this.$firebase.firestore.FieldValue.arrayRemove(removeUserForm),
            })
            batch.update(refUser, {
              sentimentStoreList: this.$firebase.firestore.FieldValue.arrayUnion(updateUserForm),
            })
            batch.update(ref.collection("cafe").doc(this.store.storeId), {
              sentimentUserList: this.$firebase.firestore.FieldValue.arrayRemove(removeStoreForm),
            })
            batch.update(ref.collection("cafe").doc(this.store.storeId), {
              sentimentUserList: this.$firebase.firestore.FieldValue.arrayUnion(updateStoreForm),
            })
            await batch.commit()
          }
        }
      } finally {
        if (this.type != "mypage") {
          this.patch()
        } else {
          if (oldVal != newVal) {
            this.$emit("updateUserPageSentiment", this.store.storeId, newVal)
          }
        }
      }
    },
  },
}
</script>
