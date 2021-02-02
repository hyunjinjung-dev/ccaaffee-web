<template>
  <v-container fluid>
    <v-card color="primary" dark>
      <v-card-title>
        <v-layout align-center justify-space-between wrap>
          <v-flex sm6 xs12 class="font-weight-medium subheading" style="text-align:center;">
            <small>방문하신 적이 있나요?</small>
          </v-flex>
          <v-flex sm6 xs12 shrink style="text-align:center;">
            <v-btn-toggle
              class="transparent"
              v-model="selectedSentiment"
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
                    @click="sentimentSelected(sentiment.id)"
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
  props: ["store"],
  data: () => ({
    selectedSentiment: null,
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
  },
  methods: {
    sentimentSelected(rate) {
      this.updateUserSentiment()
      this.$emit("sentimentSelected", rate)
    },
    async updateUserSentiment() {
      if (!this.fireUser) {
        this.$toast.error("로그인이 필요해요")
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

      if (this.selectedSentiment) {
        const batch = await this.$firebase.firestore().batch()
        batch.update(refUser, {
          likeStoreList: this.$firebase.firestore.FieldValue.arrayRemove(this.store.storeId),
          likeStoreCount: this.$firebase.firestore.FieldValue.increment(-1),
        })
        batch.update(ref.collection("cafe").doc(this.store.storeId), {
          likeUserList: this.$firebase.firestore.FieldValue.arrayRemove(this.fireUser.uid),
          likeUserCount: this.$firebase.firestore.FieldValue.increment(-1),
        })
        await batch.commit()
      } else {
        const batch = await this.$firebase.firestore().batch()
        batch.update(refUser, {
          likeStoreList: this.$firebase.firestore.FieldValue.arrayUnion(this.store.storeId),
          likeStoreCount: this.$firebase.firestore.FieldValue.increment(1),
        })
        batch.update(ref.collection("cafe").doc(this.store.storeId), {
          likeUserList: this.$firebase.firestore.FieldValue.arrayUnion(this.fireUser.uid),
          likeUserCount: this.$firebase.firestore.FieldValue.increment(1),
        })
        await batch.commit()
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
