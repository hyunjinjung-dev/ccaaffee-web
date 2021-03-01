<template>
  <v-container fluid>
    <v-row>
      <v-col
        :cols="breakPoint == 'xs' ? '6' : breakPoint == 'sm' ? '4' : breakPoint == 'md' ? '3' : '2'"
        v-for="store in storeList"
        :key="store.storeId"
        class="ma-0 pa-1"
      >
        <mypage-store-card
          :store="store"
          :type="type"
          @removeUserPageStore="removeUserPageStore"
          @updateUserPageSentiment="updateUserPageSentiment"
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
    fireUser() {
      return this.$store.state.fireUser
    },
    user() {
      return this.$store.state.user
    },
    breakPoint() {
      if (this.$vuetify.breakpoint.xs) {
        return "xs"
      } else if (this.$vuetify.breakpoint.sm) {
        return "sm"
      } else if (this.$vuetify.breakpoint.md) {
        return "md"
      } else {
        return "lg-and-up"
      }
    },
  },
  methods: {
    removeUserPageStore(storeId) {
      const storeIndex = this.storeList.findIndex((store) => {
        return store.storeId == storeId
      })
      this.storeList.splice(storeIndex, 1)
    },
    updateUserPageSentiment(storeId, newVal) {
      const storeIndex = this.storeList.findIndex((store) => {
        return store.storeId == storeId
      })
      if (newVal == 0) {
        this.storeList.splice(storeIndex, 1)
      } else {
        const userIndex = this.storeList[storeIndex].sentimentUserList.findIndex((user) => {
          return user.uid == this.fireUser.uid
        })
        this.storeList[storeIndex].sentimentUserList[userIndex].sentiment = newVal
      }
    },
    setStoreList() {
      if (this.type == "like") {
        this.userStoreIdList = this.user.likeStoreList
        this.getStoreList()
      } else if (this.type == "bookmark") {
        this.userStoreIdList = this.user.bookmarkStoreList
        this.getStoreList()
      } else if (this.type == "pin") {
        this.userStoreIdList = this.user.sentimentStoreList
        this.getStoreList()
      }
    },
    async getStoreList() {
      const ref = this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
        .collection("cafe")

      await ref.get().then((sn) => {
        sn.forEach((doc) => {
          let exists = null
          if (this.type != "pin") {
            exists = this.userStoreIdList.some((store) => doc.id == store)
          } else {
            exists = this.userStoreIdList.some((store) => doc.id == store.storeId)
          }
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
            newStore.sentimentUserList = doc.data().sentimentUserList
            newStore.sentimentUserCount = doc.data().sentimentUserCount
            this.storeList.push(newStore)
          }
        })
      })
    },
  },
}
</script>

<style></style>
