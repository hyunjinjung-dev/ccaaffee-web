<template>
  <v-sheet class="pa-1" style="background-color: inherit;">
    <v-btn
      v-if="store.bookmarkUserList && type == 'detail'"
      block
      height="56"
      @click="bookmark"
      :color="bookmarked() ? 'secondary' : ''"
    >
      <div class="pa-1">
        <div class="pb-1">
          <v-icon color="white">
            mdi-bookmark
          </v-icon>
        </div>
        <small style="display: block;">
          {{ this.store.bookmarkUserCount }}
        </small>
      </div>
    </v-btn>

    <v-btn
      v-else-if="store.bookmarkUserList && type == 'card'"
      small
      icon
      fab
      class="white--text"
      @click.stop="bookmarkBtnClicked"
    >
      <v-icon v-if="bookmarked()">
        mdi-bookmark
      </v-icon>
      <v-icon v-else>
        mdi-bookmark-outline
      </v-icon>
    </v-btn>

    <v-dialog v-model="confirmDialog" max-width="290">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          Bookmark 리스트에서 제거하시겠어요?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmDialog = false">
            취소
          </v-btn>
          <v-btn color="primary" @click=";[bookmark(), (confirmDialog = false)]">
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    confirm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      confirmDialog: false,
    }
  },
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
    bookmarkBtnClicked() {
      if (!this.fireUser) {
        this.$toast.error("로그인이 필요해요")
        return
      }
      if (this.confirm) {
        this.confirmDialog = true
        return
      }
      this.bookmark()
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
        if (confirm) {
          this.$emit("removeStore", this.store.storeId)
        }
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
