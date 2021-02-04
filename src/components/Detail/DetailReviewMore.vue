<template>
  <v-bottom-sheet v-if="reviewMoreSheet" v-model="reviewMoreSheet" @click:outside="closeBtnClicked">
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

      <v-dialog v-model="dialog" persistent max-width="290">
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
            리뷰를 완전히 삭제할까요?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false">
              취소
            </v-btn>
            <v-btn class="primary white--text" text @click="dialog = false">
              삭제
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
      dialog: false,
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
    //To Do
    console.log("mounted reveiw", this.review)
  },
  destroyed() {
    console.log("detailReviewMore Destroyed")
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
      this.dialog = true
      console.log("delete!!")
    },
    reportReviewBtnClicked() {
      console.log("report!!")
    },
  },
}
</script>

<style></style>
