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
          type="bookmark"
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
  data() {
    return {
      userStoreIdList: [],
      storeList: [],
    }
  },
  created() {
    if (this.user) {
      this.read()
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
    read() {
      this.userStoreIdList = this.user.likeStoreList
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
            newStore.bookmarkUserList = doc.data().bookmarkUserList
            newStore.bookmarkUserCount = doc.data().bookmarkUserCount
            this.storeList.push(newStore)
          }
        })
      })
    },
  },
}
</script>

<style></style>
