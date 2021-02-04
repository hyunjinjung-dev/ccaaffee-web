<template>
  <v-bottom-sheet v-model="reviewMoreSheet" @click:outside="closeBtnClicked">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon dark @click="reviewMoreBtnClicked(review)" v-bind="attrs" v-on="on">
        <v-icon color="grey">
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-if="fireUser.uid == review.uid" @click="updateReviewBtnClicked">
        <v-list-item-avatar>
          <v-icon small>mdi-pencil</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>수정</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="fireUser.uid == review.uid" @click="deleteReviewBtnClicked">
        <v-list-item-avatar>
          <v-icon small>mdi-delete</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>삭제</v-list-item-title>
      </v-list-item>

      <v-list-item @click="reportReviewBtnClicked">
        <v-list-item-avatar>
          <v-icon small>mdi-flag</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>신고</v-list-item-title>
      </v-list-item>

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
  props: ["store", "review"],
  data() {
    return {
      reviewMoreSheet: false,
      updateDialog: false,
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
  methods: {
    reviewMoreBtnClicked() {
      if (this.fireUser) {
        this.reviewMoreSheet = true
      } else {
        this.$toast.error("로그인이 필요해요")
      }
    },
    updateReviewBtnClicked() {
      if (this.fireUser.uid == this.review.uid) {
        this.$emit("updateReviewBtnClicked", this.review)
        this.closeBtnClicked()
      }
    },
    closeBtnClicked() {
      this.reviewMoreSheet = false
    },
    deleteReviewBtnClicked() {
      console.log("delete!!")
    },
    reportReviewBtnClicked() {
      console.log("report!!")
    },
  },
}
</script>

<style></style>
