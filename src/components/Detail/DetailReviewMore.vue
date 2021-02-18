<template>
  <v-bottom-sheet v-model="reviewMoreSheet" @click:outside="closeBtnClicked">
    <v-list>
      <v-list-item v-if="fireUser.uid == selectedReview.uid" @click="updateReviewBtnClicked">
        <v-list-item-avatar>
          <v-icon small>mdi-pencil</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>수정</v-list-item-title>
      </v-list-item>

      <v-dialog v-model="confirmDialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-list-item v-if="fireUser.uid == review.uid" @click="deleteReviewBtnClicked">
            <v-list-item-avatar v-bind="attrs" v-on="on">
              <v-icon small>mdi-delete</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>삭제</v-list-item-title>
          </v-list-item>
        </template>
        <v-card>
          <v-card-title class="">
            리뷰 삭제
          </v-card-title>
          <v-card-text>
            <div>
              리뷰를 완전히 삭제할까요?
            </div>
            <div>
              (삭제를 누르시면 되돌릴 수 없어요!)
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmDialog = false">
              취소
            </v-btn>
            <v-btn class="primary white--text" text @click="deleteReview">
              삭제
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- To Do : 리뷰 신고 기능 -->
      <!-- <v-list-item @click="reportReviewBtnClicked">
        <v-list-item-avatar>
          <v-icon small>mdi-delete</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>신고</v-list-item-title>
      </v-list-item> -->

      <v-divider></v-divider>
      <v-list-item @click="closeBtnClicked">
        <v-list-item-avatar>
          <v-icon small>mdi-close</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>취소</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: ["store", "selectedReview", "reviewMoreSheet"],
  data() {
    return {
      review: {},
      confirmDialog: false,
      ref: this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
        .collection("cafe")
        .doc(this.store.storeId),
    }
  },
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
  destroyed() {},
  methods: {
    fetch() {
      this.review = this.selectedReview
    },
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
    updateReviewBtnClicked() {
      this.$emit("closeBtnClicked")
      this.$emit("updateReviewBtnClicked")
    },
    deleteReviewBtnClicked() {
      this.confirmDialog = true
    },
    async deleteReview() {
      try {
        //   const batch = await this.$firebase.firestore().batch()
        //   batch.update(this.ref, {
        //     reviewCount: this.$firebase.firestore.FieldValue.increment(-1),
        //   })
        //   batch.delete(this.ref.collection("review").doc(this.selectedReview.id))
        //   await batch.commit()
        this.ref
          .collection("review")
          .doc(this.selectedReview.id)
          .delete()
      } finally {
        this.confirmDialog = false
        this.$emit("reviewDeleteComplete", this.selectedReview.id)
        this.$emit("closeBtnClicked")
      }
    },
    // To Do : 리뷰 신고 기능
    // reportReviewBtnClicked() {
    //   console.log("report!!")
    // },
  },
}
</script>

<style></style>
