<template>
  <v-container fluid>
    <v-row>
      <v-col
        :cols="breakPoint == 'xs' ? '6' : breakPoint == 'sm' ? '4' : '3'"
        v-for="(store, index) in storeList"
        :key="index"
        class="ma-0 pa-1"
      >
        <mypage-store-card
          :store="store"
          :type="type"
          @removeStore="removeStore"
        ></mypage-store-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MypageStoreCard from "@/components/Mypage/MypageStoreCard"

export default {
  components: {
    MypageStoreCard,
  },
  props: ["type"],
  data() {
    return {
      userStoreIdList: [],
      storeList: [],
    }
  },
  created() {
    if (this.user) {
      this.setStoreList()
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    breakPoint() {
      if (this.$vuetify.breakpoint.xs) {
        return "xs"
      } else if (this.$vuetify.breakpoint.sm) {
        return "sm"
      } else {
        return "md-and-up"
      }
    },
  },
  methods: {
    removeStore(storeId) {
      const storeIndex = this.storeList.findIndex((store) => {
        return store.storeId == storeId
      })
      this.storeList.splice(storeIndex, 1)
    },
    setStoreList() {
      console.log("here", this.type)
      if (this.type == "like") {
        this.userStoreIdList = this.user.likeStoreList
        this.getStoreList()
      } else if (this.type == "bookmark") {
        this.userStoreIdList = this.user.bookmarkStoreList
        this.getStoreList()
      }
      // } else if (this.type == "pin") {
      // }
    },
    getStoreList() {
      const ref = this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
        .collection("cafe")

      ref.get().then((sn) => {
        sn.forEach((doc) => {
          const exists = this.userStoreIdList.some((store) => doc.id == store)
          if (exists) {
            const newStore = {}
            newStore.storeId = doc.id
            newStore.storeNameKor = doc.data().storeNameKor
            newStore.branchName = doc.data().branchName
            newStore.addressLocation = doc.data().addressJibun.split(" ")[2]
            newStore.likeUserList = doc.data().likeUserList
            newStore.likeUserCount = doc.data().likeUserCount
            newStore.bookmarkUserList = doc.data().bookmarkUserList
            newStore.bookmarkUserCount = doc.data().bookmarkUserCount
            newStore.coverPhotoSrc = this.readCoverPhoto(doc.id)
            this.storeList.push(newStore)
          }
        })
      })
    },
    async readCoverPhoto(storeId) {
      const storageRef = this.$firebase.storage().ref()
      const listRef = storageRef.child("cafes/" + storeId + "/photo_cover")
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
          return list[0]
        })
        .catch(function(error) {
          console.log("error", error)
        })
      return storageData
    },
  },
}
</script>

<style></style>
