<template>
  <v-card>
    <!-- :src="src" -->
    <v-img
      class="white--text"
      :src="coverPhotoSrc"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      aspect-ratio="0.7"
      @click.once="goToDetail(store.storeId)"
    >
      <!-- <template v-slot:placeholder>
        <div style="height:100%; width:100%; background-color: grey;"></div>
        <v-row class="fill-height ma-0" align="center" justify="center">
          Cover를 등록해주세요
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template> -->
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

        <v-card-text class="white--text py-0">
          <v-chip small>{{ store.addressLocation }} </v-chip>
        </v-card-text>

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
      coverPhoto: null,
      // src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
    }
  },
  mounted() {
    this.readCoverPhoto()
  },
  watch: {
    // 필터를 변경했을 때, 이미지가 rerendering되지 않는 문제로 인해 watch 추가
    store() {
      this.readCoverPhoto()
    },
  },
  computed: {
    coverPhotoSrc() {
      if (this.coverPhoto != null) {
        return this.coverPhoto[0]?.link
      } else {
        return ""
      }
    },
  },
  methods: {
    async readCoverPhoto() {
      const storageRef = this.$firebase.storage().ref()
      const listRef = storageRef.child("cafes/" + this.store.storeId + "/photo_cover")
      let storageData = await listRef
        .listAll()
        .then(function(res) {
          let list = []
          res.items.forEach(function(itemRef) {
            // storage file의 이름 가져오기 >> createdAt, uid 세팅
            let fileName = itemRef.name
            let fileNameSplit = itemRef.name.split("-")
            let createdAt = Number(fileNameSplit[0])
            let uid = fileNameSplit[1]

            // storage file의 링크 가져오고 Data Setting
            itemRef.getDownloadURL().then(function(url) {
              let link = url
              list.push({
                fileName: fileName,
                createdAt: createdAt,
                link: link,
                uid: uid,
              })
            })
          })
          // console.log("===========", list)
          return list
        })
        .catch(function(error) {
          console.log("error", error)
        })
      // console.log("here", storageData)
      this.coverPhoto = storageData
      // console.log("coverPhoto", this.coverPhoto, this.coverPhoto[0], this.coverPhoto.link)
      // console.log("coverPhoto[0]", this.coverPhoto[0])
    },
    goToDetail(storeId) {
      this.$router.push({ name: "Detail", params: { storeId: storeId } })
    },
  },
}
</script>

<style></style>
