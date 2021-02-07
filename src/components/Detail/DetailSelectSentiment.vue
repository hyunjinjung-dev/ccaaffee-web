<template>
  <v-container fluid>
    <v-card color="primary" dark>
      <v-card-title>
        <v-layout align-center justify-space-between wrap>
          <v-flex sm6 xs12 class="font-weight-medium subheading" style="text-align:center;">
            <small v-if="store.storeNameKor"> {{ store.storeNameKor }}에 </small>

            <small>방문하신 적이 있나요?</small>
          </v-flex>
          <v-flex sm6 xs12 shrink style="text-align:center;">
            <v-btn-toggle
              class="transparent"
              v-model="oldSentiment"
              borderless
              mandatory
              tile
              active-class="active-sentiment"
            >
              <v-tooltip
                v-for="sentiment in sentiments"
                :key="`sentiment-key-${sentiment.id}`"
                :color="sentiment.color"
                top
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    :ripple="false"
                    v-on="on"
                    text
                    @click="sentimentSelected(sentiment.id, oldSentiment)"
                  >
                    <v-icon>{{ sentiment.icon }}</v-icon>
                  </v-btn>
                </template>
                {{ sentiment.title }}
              </v-tooltip>
            </v-btn-toggle>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "DetailSelectSentiment",
  props: ["store", "userSentiment"],
  data: () => ({
    oldSentiment: null,
    newSentiment: null,
    sentiments: [
      {
        id: 0,
        icon: "mdi-close-circle-outline",
        title: "미방문",
        color: "black",
      },
      {
        id: 1,
        icon: "mdi-emoticon-sad-outline",
        title: "별로",
        color: "error",
      },
      {
        id: 2,
        icon: "mdi-emoticon-neutral-outline",
        title: "쏘쏘",
        color: "warning",
      },
      {
        id: 3,
        icon: "mdi-emoticon-happy-outline",
        title: "만족",
        color: "info",
      },
      {
        id: 4,
        icon: "mdi-emoticon-kiss-outline",
        title: "추천",
        color: "success",
      },
    ],
  }),
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
    fireUser() {
      return this.$store.state.fireUser
    },
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.oldSentiment = this.userSentiment
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
        this.$emit("sentimentSelected")
      }
    },
  },
}
</script>

<style scoped>
.v-btn-toggle .v-btn.v-btn--icon {
  width: 37px;
}
.v-btn-toggle--selected {
  box-shadow: none;
}
.active-sentiment {
  background-color: #e57373;
}
</style>
