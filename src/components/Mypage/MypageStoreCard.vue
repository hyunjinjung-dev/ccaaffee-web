<template>
  <v-card>
    <v-img
      class="white--text"
      :src="store.coverPhotoSrc"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      aspect-ratio="0.7"
      @click.once="goToDetail(store.storeId)"
    >
      <template v-slot:placeholder>
        <div>hell</div>
      </template>

      <v-card
        class="d-flex flex-column white--text"
        height="100%"
        style="background-color: inherit;"
      >
        <div v-if="type == 'like'" style="text-align:right;">
          <detail-like :store="store" type="card" confirm @removeStore="removeStore"></detail-like>
        </div>

        <div v-else-if="type == 'bookmark'" style="text-align:right;">
          <detail-bookmark
            :store="store"
            type="card"
            confirm
            @removeStore="removeStore"
          ></detail-bookmark>
        </div>

        <div v-else-if="type == 'pin'" style="text-align:right;">
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
      </v-card>
    </v-img>
  </v-card>
</template>

<script>
import DetailLike from "@/components/Detail/DetailLike.vue"
import DetailBookmark from "@/components/Detail/DetailBookmark.vue"
import StoreCardSentiment from "@/components/StoreCardSentiment.vue"

export default {
  components: {
    DetailLike,
    DetailBookmark,
    StoreCardSentiment,
  },
  props: {
    store: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      coverPhoto: null,
    }
  },
  mounted() {
    this.readCoverPhoto()
  },
  watch: {
    // 필터를 변경했을 때, 이미지가 rerendering되지 않는 문제로 인해 watch 추가
    store: {
      deep: true,
      handler() {
        console.log("store changed")
        this.readCoverPhoto()
      },
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
    removeStore(storeId) {
      this.$emit("removeStore", storeId)
    },
    // async readCoverPhoto() {
    //   const storageRef = this.$firebase.storage().ref()
    //   const listRef = storageRef.child("cafes/" + this.store.storeId + "/photo_cover")
    //   let storageData = await listRef
    //     .listAll()
    //     .then(function(res) {
    //       let list = []
    //       res.items.forEach(function(itemRef) {
    //         // storage file의 이름 가져오기 >> createdAt, uid 세팅
    //         let fileName = itemRef.name
    //         let fileNameSplit = itemRef.name.split("-")
    //         let createdAt = Number(fileNameSplit[0])
    //         let uid = fileNameSplit[1]

    //         // storage file의 링크 가져오고 Data Setting
    //         itemRef.getDownloadURL().then(function(url) {
    //           let link = url
    //           list.push({
    //             fileName: fileName,
    //             createdAt: createdAt,
    //             link: link,
    //             uid: uid,
    //           })
    //         })
    //       })
    //       return list
    //     })
    //     .catch(function(error) {
    //       console.log("error", error)
    //     })
    //   this.coverPhoto = storageData
    // },
    goToDetail(storeId) {
      this.$router.push({ name: "Detail", params: { storeId: storeId } })
    },
  },
}
</script>

<style></style>
