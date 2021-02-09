<template>
  <v-sheet class="mt-2">
    <v-card class="transparent">
      <v-list-item three-line>
        <v-list-item-avatar class="mt-7" size="36" v-if="fireUser">
          <v-img :src="fireUser.photoURL"></v-img>
          <!-- <v-img v-else></v-img> -->
        </v-list-item-avatar>
        <v-list-item-content class="align-self-auto">
          <v-textarea
            v-model="newReviewContent"
            placeholder="카페가 마음에 드셨나요?"
            hint="맛 · 분위기 · 재방문 의사 등을 평가해주세요"
            @click="reviewFieldClicked"
            rows="1"
            auto-grow
          >
          </v-textarea>
          <v-expand-transition>
            <div v-if="showReviewBtns" class="d-inline-block text-right">
              <v-btn text @click=";[(showReviewBtns = !showReviewBtns), (newReviewContent = '')]"
                >취소</v-btn
              >
              <v-btn
                class="primary white--text"
                depressed
                :disabled="newReviewContent === ''"
                @click="save"
              >
                리뷰
              </v-btn>
            </div>
          </v-expand-transition>
        </v-list-item-content>
      </v-list-item>

      <template v-for="(review, index) in reviewList">
        <v-divider :key="index" class="mx-4"></v-divider>

        <v-list-item :key="review.id">
          <v-list-item-avatar size="36">
            <v-img :src="review.user.photoURL"></v-img>
            <!-- <v-img v-else></v-img> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle class="reviewRow">
              <span>{{ review.user.displayName }}</span>
              <span> · </span>
              <display-time :time="review.createdAt"></display-time>
              <!-- <span v-if="updatedToggle(review)"> · (수정됨)</span> -->
              <!-- TimeStamp 비교를 위해 String() type 변환 -->
              <span v-if="String(review.createdAt) != String(review.updatedAt)"> · (수정됨)</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="reviewRow">
              <span>{{ review.reviewContent }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle> </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-container class="pa-0">
              <v-row align="center" no-gutters>
                <v-col align="center">
                  <v-btn icon @click="like(review)">
                    <v-icon small :color="liked(review) ? 'error' : 'grey lighten-1'">
                      mdi-thumb-up
                    </v-icon>
                    <span>{{ review.likeCount }}</span>
                  </v-btn>
                </v-col>
              </v-row>

              <v-row align="center" no-gutters>
                <v-col align="center">
                  <v-btn icon @click="reviewMoreBtnClicked(review)">
                    <v-icon>
                      mdi-dots-vertical
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-list-item
        v-if="lastDoc && reviewList.length < store.reviewCount"
        v-intersect="onIntersect"
      >
        <v-btn @click="readMoreReview" text color="error" block>더보기</v-btn>
      </v-list-item>
    </v-card>

    <detail-review-more
      v-if="reviewMoreSheet"
      :store="store"
      :selectedReview="selectedReview"
      :reviewMoreSheet="reviewMoreSheet"
      @closeBtnClicked="closeReviewMoreSheet"
      @updateReviewBtnClicked="updateReviewBtnClicked"
      @reviewDeleteComplete="deleteUserPageReview"
    >
    </detail-review-more>

    <detail-review-update
      v-if="updateDialog"
      :store="store"
      :selectedReview="selectedReview"
      :updateDialog="updateDialog"
      @reviewUpdateComplete="updateUserPageReview"
      @closeBtnClicked="closeUpdateDialog"
    ></detail-review-update>

    <v-snackbar v-model="snackbar" :timeout="3500">
      로그인이 필요해요 👉🏻
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="$router.push({ name: 'login' })">
          로그인하러 가기
        </v-btn>
      </template>
    </v-snackbar>
  </v-sheet>
</template>

<script>
import { last } from "lodash"
import DisplayTime from "@/components/DisplayTime"
import DetailReviewMore from "@/components/Detail/DetailReviewMore"
import DetailReviewUpdate from "@/components/Detail/DetailReviewUpdate"
const LIMIT = 5

export default {
  components: {
    DisplayTime,
    DetailReviewMore,
    DetailReviewUpdate,
  },
  props: ["store"],
  data() {
    return {
      updateDialog: false,
      reviewMoreSheet: false,

      snackbar: false,

      showReviewBtns: false,
      reviewMoreApprovedUser: null,
      reviewList: [],
      selectedReview: {},
      // newReviewContent: "맛 : \n분위기 : \n재방문 의사 : ",
      newReviewContent: "",
      unsubscribe: null,
      lastDoc: null,
      ref: this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
        .collection("cafe")
        .doc(this.store.storeId),
    }
  },
  created() {
    this.subscribe()
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe()
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
    // Create : Write & Save Review
    reviewFieldClicked() {
      if (this.fireUser) {
        this.showReviewBtns = true
      } else {
        this.$toast.error("로그인이 필요해요")
      }
    },
    async save() {
      if (this.newReviewContent.length <= 10) {
        this.$toast.error("리뷰는 10글자 이상 입력해주세요")
        return
      }

      let doc = {
        createdAt: new Date(),
        updatedAt: new Date(),
        reviewContent: this.newReviewContent,
        uid: this.$store.state.fireUser.uid,
        user: {
          email: this.user.email,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
        },
        likeCount: 0,
        likeUserList: [],
        dislikeCount: 0,
        dislikeUserList: [],
      }
      const id = doc.createdAt.getTime().toString()

      this.ref
        .collection("review")
        .doc(id)
        .set(doc)

      // const batch = await this.$firebase.firestore().batch()
      // batch.update(this.ref, { reviewCount: this.$firebase.firestore.FieldValue.increment(1) })
      // batch.set(this.ref.collection("review").doc(id), doc)
      // await batch.commit()
      doc = {}
      this.newReviewContent = ""
      this.showReviewBtns = false
    },

    // Read : subscribe, snapshot, readmore review
    subscribe() {
      if (this.unsubscribe) {
        this.unsubscribe()
      }
      this.unsubscribe = this.ref
        .collection("review")
        .orderBy("createdAt", "desc")
        .limit(LIMIT)
        .onSnapshot((sn) => {
          if (sn.empty) {
            this.reviewList = []
            return
          }
          this.snapshotToReviewList(sn)
        })
    },
    snapshotToReviewList(sn) {
      this.lastDoc = last(sn.docs)
      sn.docs.forEach((doc) => {
        const exists = this.reviewList.some((review) => doc.id === review.id)
        if (!exists) {
          const review = doc.data()
          review.id = doc.id
          review.createdAt = review.createdAt.toDate()
          review.updatedAt = review.updatedAt.toDate()
          this.reviewList.push(review)
        }
      })
      this.reviewList.sort((before, after) => {
        const beforeId = Number(before.id)
        const afterId = Number(after.id)
        return afterId - beforeId
      })
    },
    async readMoreReview() {
      if (!this.lastDoc) {
        return
      }
      const sn = await this.ref
        .collection("review")
        .orderBy("createdAt", "desc")
        .startAfter(this.lastDoc)
        .limit(LIMIT)
        .get()
      this.snapshotToReviewList(sn)
    },
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting) this.readMoreReview()
    },

    // Review More Btn
    reviewMoreBtnClicked(review) {
      if (this.fireUser) {
        this.selectedReview = review
        this.reviewMoreSheet = true
      } else {
        this.$toast.error("로그인이 필요해요")
      }
    },
    closeReviewMoreSheet() {
      this.reviewMoreSheet = false
    },

    // Update : Update Review
    updateReviewBtnClicked() {
      if (this.fireUser.uid == this.selectedReview.uid) {
        this.updateDialog = true
      }
    },
    closeUpdateDialog() {
      this.updateDialog = false
    },
    updateUserPageReview(reviewId, updatedAt, updatedReviewContent) {
      const updateIndex = this.reviewList.findIndex((item) => {
        return item.id == reviewId
      })
      if (updateIndex >= 0) {
        this.reviewList[updateIndex].updatedAt = updatedAt
        this.reviewList[updateIndex].reviewContent = updatedReviewContent
      }
    },

    // like review
    liked(review) {
      if (!this.fireUser) {
        return false
      }
      return review.likeUserList?.includes(this.fireUser.uid)
    },
    async like(review) {
      if (!this.fireUser) {
        this.snackbar = true
        return
      }
      if (this.liked(review)) {
        await this.ref
          .collection("review")
          .doc(review.id)
          .update({
            likeCount: this.$firebase.firestore.FieldValue.increment(-1),
            likeUserList: this.$firebase.firestore.FieldValue.arrayRemove(this.fireUser.uid),
          })
      } else {
        await this.ref
          .collection("review")
          .doc(review.id)
          .update({
            likeCount: this.$firebase.firestore.FieldValue.increment(1),
            likeUserList: this.$firebase.firestore.FieldValue.arrayUnion(this.fireUser.uid),
          })
      }
      const doc = await this.ref
        .collection("review")
        .doc(review.id)
        .get()
      const item = doc.data()
      review.likeCount = item.likeCount
      review.likeUserList = item.likeUserList
    },

    // Delete :
    deleteUserPageReview(reviewId) {
      const deleteIndex = this.reviewList.findIndex((item) => {
        return item.id == reviewId
      })
      if (deleteIndex >= 0) {
        this.reviewList.splice(deleteIndex, 1)
      }
    },
  },
}
</script>

<style>
.reviewRow {
  white-space: pre-wrap;
}
</style>
