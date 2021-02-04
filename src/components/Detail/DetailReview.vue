<template>
  <v-sheet>
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
            @click="reviewFieldClicked"
            rows="1"
            auto-grow
          >
          </v-textarea>
          <div v-if="showReviewBtns" class="d-inline-block text-right">
            <v-btn text @click=";[(showReviewBtns = !showReviewBtns), (newReviewContent = '')]"
              >취소</v-btn
            >
            <v-btn
              class="primary white--text"
              depressed
              tile
              :disabled="newReviewContent === ''"
              @click="save"
            >
              리뷰
            </v-btn>
          </div>
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

              <!-- <span class="mx-1"> • </span> -->
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
                  <v-btn icon dark @click="reviewMoreBtnClicked(review)">
                    <v-icon color="grey">
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
      @deleteReviewBtnClicked="deleteReviewBtnClicked"
    >
    </detail-review-more>
    <!-- <v-bottom-sheet v-if="reviewMoreSheet && fireUser" v-model="reviewMoreSheet">
      <v-list>
        <v-list-item v-if="fireUser.uid == reviewMoreApprovedUser" @click="updateReviewBtnClicked">
          <v-list-item-avatar>
            <v-icon small>mdi-pencil</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>수정</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="fireUser.uid == reviewMoreApprovedUser" @click="deleteReviewBtbClicked">
          <v-list-item-avatar>
            <v-icon small>mdi-delete</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>삭제</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item @click="closeReviewMoreSheet">
          <v-list-item-avatar>
            <v-icon small>mdi-close</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>취소</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet> -->

    <detail-review-update
      v-if="updateDialog"
      :store="store"
      :selectedReview="selectedReview"
      :dialog="updateDialog"
      @closeBtnClicked="closeUpdateDialog"
    ></detail-review-update>

    <v-snackbar v-model="snackbar" :timeout="3500">
      로그인이 필요해요 👉🏻
      <template v-slot:action="{ attrs }">
        <v-btn color="error" text v-bind="attrs" @click="$router.push({ name: 'login' })">
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
    // updatedToggle(review) {
    //   if (String(review.createdAt) != String(review.updatedAt)) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    openUpdateDialog() {
      this.updateDialog = true
    },
    closeUpdateDialog() {
      this.updateDialog = false
    },

    reviewFieldClicked() {
      if (this.fireUser) {
        this.showReviewBtns = true
      } else {
        this.$toast.error("로그인이 필요해요")
      }
    },
    reviewMoreBtnClicked(review) {
      if (this.fireUser) {
        this.selectedReview = review
        this.reviewMoreApprovedUser = review.uid
        this.reviewMoreSheet = true
      } else {
        this.$toast.error("로그인이 필요해요")
      }
    },
    closeReviewMoreSheet() {
      console.log("close")
      this.reviewMoreSheet = false
    },
    async save() {
      if (this.newReviewContent.length <= 10) {
        this.$toast.error("리뷰는 10글자 이상 입력해주세요")
        return
      }

      let doc = {
        // To Do
        // createdAt, updatedAt에 대한 고찰. 두 값은 과연 같은가.
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
    liked(review) {
      if (!this.fireUser) {
        return false
      }
      return review.likeUserList?.includes(this.fireUser.uid)
    },
    updateReviewBtnClicked() {
      console.log("update!!")
      if (this.fireUser.uid == this.reviewMoreApprovedUser) {
        this.reviewMoreSheet = false
        this.updateDialog = true
      }
    },
    deleteReviewBtnClicked() {
      console.log("delete!!")
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
  },
}
</script>

<style>
.reviewRow {
  white-space: pre-wrap;
}
</style>
