<template>
  <v-sheet class="pa-1">
    <v-btn
      v-if="store.bookmarkUserList"
      block
      height="56"
      @click="bookmark"
      :color="bookmarked() ? 'secondary' : ''"
    >
      <div class="pa-1">
        <div class="pb-1">
          <v-icon>
            mdi-bookmark-outline
          </v-icon>
        </div>
        <small style="display: block;">
          {{ this.store.bookmarkUserCount }}
        </small>
      </div>
    </v-btn>
  </v-sheet>
</template>

<script>
export default {
  props: ["store"],
  computed: {
    fireUser() {
      return this.$store.state.fireUser
    },
  },
  methods: {
    bookmarked() {
      if (!this.fireUser) {
        return false
      }
      return this.store.bookmarkUserList.includes(this.fireUser.uid)
    },
    async bookmark() {
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

      if (this.bookmarked()) {
        const batch = await this.$firebase.firestore().batch()
        batch.update(refUser, {
          bookmarkStoreList: this.$firebase.firestore.FieldValue.arrayRemove(this.store.storeId),
          bookmarkStoreCount: this.$firebase.firestore.FieldValue.increment(-1),
        })
        batch.update(ref, {
          bookmarkUserList: this.$firebase.firestore.FieldValue.arrayRemove(this.fireUser.uid),
          bookmarkUserCount: this.$firebase.firestore.FieldValue.increment(-1),
        })
        await batch.commit()
      } else {
        const batch = await this.$firebase.firestore().batch()
        batch.update(refUser, {
          bookmarkStoreList: this.$firebase.firestore.FieldValue.arrayUnion(this.store.storeId),
          bookmarkStoreCount: this.$firebase.firestore.FieldValue.increment(1),
        })
        batch.update(ref, {
          bookmarkUserList: this.$firebase.firestore.FieldValue.arrayUnion(this.fireUser.uid),
          bookmarkUserCount: this.$firebase.firestore.FieldValue.increment(1),
        })
        await batch.commit()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
