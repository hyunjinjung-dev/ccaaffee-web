<template>
  <v-bottom-sheet v-if="reviewMoreSheet && fireUser" v-model="reviewMoreSheet">
    <v-list>
      <v-list-item v-if="fireUser.uid == selectedReview.uid" @click="updateReviewBtnClicked">
        <v-list-item-avatar>
          <v-icon small>mdi-pencil</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>수정</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="fireUser.uid == selectedReview.uid" @click="deleteReviewBtnClicked">
        <v-list-item-avatar>
          <v-icon small>mdi-delete</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>삭제</v-list-item-title>
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
  props: ["store", "reviewMoreSheet", "selectedReview"],
  data() {
    return {}
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
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
    updateReviewBtnClicked() {
      this.$emit("updateReviewBtnClicked")
    },
    deleteReviewBtnClicked() {
      this.$emit("deleteReviewBtbClicked")
    },
    // closeReviewMoreSheet() {
    //         this.$emit("closeBtnClicked")
    // },
  },
}
</script>

<style></style>
