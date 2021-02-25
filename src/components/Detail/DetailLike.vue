<template>
  <v-sheet class="pa-1" style="background-color: inherit;">
    <v-btn
      v-if="store.likeUserList && type == 'detail'"
      block
      height="56"
      @click="like"
      :color="liked() ? 'primary' : ''"
    >
      <div class="pa-1">
        <div class="pb-1">
          <v-icon color="white">
            mdi-heart
          </v-icon>
        </div>
        <small style="display: block;">
          {{ this.store.likeUserCount }}
        </small>
      </div>
    </v-btn>

    <v-btn
      v-else-if="store.likeUserList && type == 'card'"
      small
      icon
      fab
      class="white--text"
      @click.stop="like"
    >
      <v-icon v-if="liked()">
        mdi-heart
      </v-icon>
      <v-icon v-else>
        mdi-heart-outline
      </v-icon>
    </v-btn>
  </v-sheet>
</template>

<script>
export default {
  props: {
    store: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: "detail",
    },
  },
  computed: {
    fireUser() {
      return this.$store.state.fireUser
    },
  },
  methods: {
    liked() {
      if (!this.fireUser) {
        return false
      }
      return this.store.likeUserList.includes(this.fireUser.uid)
    },

    async like() {
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
        .collection("cafe")
        .doc(this.store.storeId)

      if (this.liked()) {
        const batch = await this.$firebase.firestore().batch()
        batch.update(refUser, {
          likeStoreList: this.$firebase.firestore.FieldValue.arrayRemove(this.store.storeId),
          likeStoreCount: this.$firebase.firestore.FieldValue.increment(-1),
        })
        batch.update(ref, {
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
        batch.update(ref, {
          likeUserList: this.$firebase.firestore.FieldValue.arrayUnion(this.fireUser.uid),
          likeUserCount: this.$firebase.firestore.FieldValue.increment(1),
        })
        await batch.commit()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
