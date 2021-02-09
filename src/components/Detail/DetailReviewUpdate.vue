<template>
  <v-bottom-sheet v-model="updateDialog" persistent>
    <!-- <template v-slot:activator="{ on, attrs }">
      <v-btn color="green" dark v-bind="attrs" v-on="on">
        Open Persistent
      </v-btn>
    </template> -->
    <v-sheet height="200px">
      <v-container class="py-5">
        <v-row class="justify-center">
          <v-card flat min-width="350px">
            <v-list-item three-line>
              <v-list-item-avatar class="mt-7" size="36" v-if="fireUser">
                <v-img :src="fireUser.photoURL"></v-img>
                <!-- <v-img v-else></v-img> -->
              </v-list-item-avatar>
              <v-list-item-content class="align-self-auto">
                <v-textarea
                  v-model="updatedReviewContent"
                  placeholder="카페가 마음에 드셨나요?"
                  rows="1"
                  auto-grow
                >
                </v-textarea>
                <div class="d-inline-block text-right">
                  <v-btn text @click="closeBtnClicked">취소</v-btn>
                  <v-btn class="primary white--text" depressed @click="save">
                    수정
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-row>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: ["store", "selectedReview", "updateDialog"],
  data() {
    return {
      updatedReviewContent: "",
      ref: this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
        .collection("cafe")
        .doc(this.store.storeId),
    }
  },
  mounted() {
    this.fetch()
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
    fetch() {
      this.updatedReviewContent = this.selectedReview.reviewContent
    },
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
    async save() {
      // 변경된 내용이 없을 경우 sheet 닫기
      if (this.selectedReview.reviewContent == this.updatedReviewContent) {
        this.$emit("closeBtnClicked")
        return
      }
      if (this.updatedReviewContent.length <= 10) {
        this.$toast.error("리뷰는 10글자 이상 입력해주세요")
        return
      }
      let updatedAt = new Date()
      let doc = {
        updatedAt: updatedAt,
        reviewContent: this.updatedReviewContent,
      }
      await this.ref
        .collection("review")
        .doc(this.selectedReview.id)
        .update(doc)

      this.$emit(
        "reviewUpdateComplete",
        this.selectedReview.id,
        updatedAt,
        this.updatedReviewContent
      )
      this.$emit("closeBtnClicked")
    },
  },
}
</script>

<style></style>
ㅡ
