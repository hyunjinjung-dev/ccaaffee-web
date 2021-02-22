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
          <!-- <v-btn icon fab class="white--text mr-1">
            <v-icon>
              mdi-heart-outline
            </v-icon>
          </v-btn> -->
          <detail-like :store="store" type="card"></detail-like>
        </div>
        <div style="text-align:right;">
          <detail-bookmark :store="store" type="card"></detail-bookmark>
          <!-- <v-btn icon fab class="white--text">
            <v-icon>
              mdi-bookmark-outline
            </v-icon>
          </v-btn> -->
        </div>
        <div style="text-align:right;">
          <v-btn icon fab class="white--text">
            <v-icon>
              mdi-pin-outline
            </v-icon>
          </v-btn>
        </div>

        <v-spacer></v-spacer>

        <v-card-title class="white--text">
          {{ store.storeNameKor }}
        </v-card-title>

        <v-card-subtitle class="white--text" v-if="store.branchName">
          {{ store.branchName }}
        </v-card-subtitle>

        <v-card-text class="white--text">
          Open
          <v-icon class="white--text">mdi-circle-small</v-icon>
          <v-icon class="white--text" x-small>mdi-eye</v-icon>
          <display-count :count="store.viewCount"></display-count>

          <v-icon class="white--text">mdi-circle-small</v-icon>
          <v-icon class="white--text" x-small>mdi-heart</v-icon>
          <display-count :count="store.likeUserCount"></display-count>

          <v-icon class="white--text">mdi-circle-small</v-icon>
          <v-icon class="white--text" x-small>mdi-bookmark</v-icon>
          <display-count :count="store.bookmarkUserCount"></display-count>
        </v-card-text>
      </v-card>
    </v-img>

    <!-- <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions> -->
  </v-card>

  <!-- <v-card class="card mx-auto pa-2" :max-width="card.maxWidth">
    <v-img src> </v-img>
    <v-row no-gutters>
      <v-col cols="10" @click="goToDetail(store.storeId)">
        <v-card-title class="pt-3 pl-2 subtitle-1 font-weight-bold">
          {{ store.storeNameKor }}
          {{ store.branchName }}
        </v-card-title>

        <v-card-subtitle class="pl-2 pb-0">
          Open
          <v-icon>mdi-circle-small</v-icon>
          <v-icon x-small>mdi-eye</v-icon>
          2.3k

          <v-icon>mdi-circle-small</v-icon>
          <v-icon x-small>mdi-heart</v-icon>
          320
        </v-card-subtitle>
      </v-col>
      <v-col cols="2" class="pl-0 pt-3">
        <v-btn fab small depressed :color="liked ? 'primary' : ''" @click="heartBtnClicked">
          <v-icon color="white">mdi-heart</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card> -->
</template>

<script>
import DisplayCount from "@/components/DisplayCount"
import DetailLike from "@/components/Detail/DetailLike.vue"
import DetailBookmark from "@/components/Detail/DetailBookmark.vue"

export default {
  components: {
    DisplayCount,
    DetailLike,
    DetailBookmark,
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
