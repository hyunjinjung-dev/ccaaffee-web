<template>
  <v-card>
    <v-img
      :src="src"
      class="white--text"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      aspect-ratio="0.7"
    >
      <v-card
        class="d-flex flex-column white--text"
        height="100%"
        style="background-color: inherit;"
      >
        <div class="" style="text-align:right;">
          <detail-like :store="store" type="card"></detail-like>
        </div>
        <div style="text-align:right;">
          <detail-bookmark :store="store" type="card"></detail-bookmark>
        </div>
        <div style="text-align:right;">
          <store-card-sentiment :store="store"></store-card-sentiment>
        </div>

        <v-spacer></v-spacer>

        <v-card-title class="white--text">
          {{ store.storeNameKor }}
        </v-card-title>

        <v-card-subtitle class="white--text" v-if="store.branchName">
          {{ store.branchName }}
        </v-card-subtitle>

        <v-card-text class="white--text py-0">
          <detail-operating-time-calc
            v-if="store.operatingTimeInfo"
            :operatingTime="store.operatingTime"
          ></detail-operating-time-calc>
        </v-card-text>

        <v-card-text class="white--text py-0">
          <v-icon class="white--text" x-small>mdi-eye</v-icon>
          <display-count :count="store.viewCount"></display-count>

          <v-icon class="white--text">mdi-circle-small</v-icon>
          <v-icon class="white--text" x-small>mdi-pencil</v-icon>
          <display-count :count="store.reviewCount"></display-count>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          <v-icon class="white--text" x-small>mdi-heart</v-icon>
          <display-count :count="store.likeUserCount"></display-count>

          <v-icon class="white--text">mdi-circle-small</v-icon>
          <v-icon class="white--text" x-small>mdi-bookmark</v-icon>
          <display-count :count="store.bookmarkUserCount"></display-count>

          <v-icon class="white--text">mdi-circle-small</v-icon>
          <v-icon class="white--text" x-small>mdi-pin</v-icon>
          <display-count :count="store.sentimentUserCount"></display-count>
        </v-card-text>
      </v-card>
    </v-img>
  </v-card>
</template>

<script>
import DisplayCount from "@/components/DisplayCount"
import DetailOperatingTimeCalc from "@/components/Detail/DetailOperatingTimeCalc.vue"
import DetailLike from "@/components/Detail/DetailLike.vue"
import DetailBookmark from "@/components/Detail/DetailBookmark.vue"
import StoreCardSentiment from "@/components/StoreCardSentiment.vue"

export default {
  components: {
    DisplayCount,
    DetailOperatingTimeCalc,
    DetailLike,
    DetailBookmark,
    StoreCardSentiment,
  },
  props: {
    store: {
      type: Object,
      required: true,
    },
    card: Object,
  },
  data() {
    return {
      src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
      liked: false,
      colors: ["green", "secondary", "yellow darken-4", "red lighten-2", "orange darken-1"],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    }
  },
  mounted() {},
  methods: {
    heartBtnClicked() {
      this.liked = !this.liked
    },
    goToDetail(storeId) {
      this.$router.push({ name: "Detail", params: { storeId: storeId } })
    },
  },
  computed: {
    // liked() {
    //   return false
    // },
  },
}
</script>

<style></style>
