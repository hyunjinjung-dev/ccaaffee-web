<template>
  <v-sheet class="pa-1" style="background-color: inherit;">
    <v-btn
      v-if="store.likeUserList && type == 'detail'"
      block
      height="56"
      @click="likeBtnClicked"
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
      @click.stop="likeBtnClicked"
    >
      <v-icon v-if="liked()">
        mdi-heart
      </v-icon>
      <v-icon v-else>
        mdi-heart-outline
      </v-icon>
    </v-btn>

    <v-dialog v-model="confirmDialog" max-width="290">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          Like 리스트에서 제거하시겠어요?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmDialog = false">
            취소
          </v-btn>
          <v-btn color="primary" @click=";[like(), (confirmDialog = false)]">
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
    liked() {
      if (!this.fireUser) {
        return false
      }
      return this.store.likeUserList.includes(this.fireUser.uid)
    },
    likeBtnClicked() {
      if (!this.fireUser) {
        this.$toast.error("로그인이 필요해요")
        return
      }
      if (this.confirm) {
        this.confirmDialog = true
        return
      }
      this.like()
    },
    async like() {
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
        if (confirm) {
          this.$emit("removeUserPageStore", this.store.storeId)
        }
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
