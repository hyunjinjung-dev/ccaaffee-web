<template>
  <div :class="this.$vuetify.breakpoint.xs ? '' : 'ma-5'">
    <v-app-bar flat style="background-color: inherit;">
      <v-text-field
        flat
        hide-details
        append-icon="mdi-magnify"
        placeholder="Search"
        outlined
        dense
        v-model="searchText"
        @click:append="searchBtnClicked"
        class="mr-2"
      ></v-text-field>

      <filter-dialog @applyFilter="applyFilter"></filter-dialog>
    </v-app-bar>

    <v-container fluid>
      <!-- <h3 class="headline font-weight-medium">연남동 카페</h3> -->
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(store, index) in storeList"
          :key="index"
          class="mx-xs-auto"
        >
          <!-- v-for="i in loading ? 10 : 12"
          :key="i" -->
          <!-- <v-skeleton-loader type="card-avatar" :loading="loading"> -->
          <store-card
            v-if="store"
            :card="{ maxWidth: 350 }"
            :store="store"
            :fireUser="fireUser"
          ></store-card>
          <!-- </v-skeleton-loader> -->
        </v-col>
      </v-row>
    </v-container>

    <!-- <v-btn @click="save">save</v-btn>
    <v-btn @click="read">read</v-btn> -->

    <!-- 필터 -->
    <!-- <v-dialog
    > -->
  </div>
</template>

<script>
import StoreCard from "@/components/StoreCard"
import FilterDialog from "@/components/FilterDialog.vue"

export default {
  components: {
    FilterDialog,
    StoreCard,
  },
  data() {
    return {
      loading: true,
      // filterDialogToggle: false,

      currentLat: 37.56234349502607,
      currentLng: 126.92275079884912,
      distance: 0,
      searchText: "",

      storeList: [],
      optionList: [],
    }
  },
  created() {
    this.subscribe()
    // this.getCurrentLocation()
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  computed: {
    fireUser() {
      return this.$store.state.fireUser
    },
  },
  methods: {
    // getCurrentLocation() {
    //   console.log("getCurrentLocation")
    //   let that = this
    //   // 위치정보 사용 가능
    //   if ("geolocation" in navigator) {
    //     navigator.geolocation.getCurrentPosition(that.onSuccessGeolocation, that.onErrorGeolocation)
    //   }
    // },
    // onSuccessGeolocation(position) {
    //   this.currentLat = position.coords.latitude
    //   this.currentLng = position.coords.longitude
    //   this.subscribe()
    // },
    // onErrorGeolocation() {
    //   this.subscribe()
    // },

    subscribe() {
      // 1. subscribe로 모든 데이터를 받아서 필터링을 하면 과금 문제
      // 2. 리뷰 읽듯이 5개씩 끊어서 받으려고 하면 조건이 이미 지어진 상태에서 5개씩 받아야함.

      let ref = null
      if (this.optionList.length == 0) {
        ref = this.$firebase
          .firestore()
          .collection("store")
          .doc("cafes")
          .collection("cafe")
      } else {
        ref = this.$firebase
          .firestore()
          .collection("store")
          .doc("cafes")
          .collection("cafe")
        this.optionList.forEach((option) => {
          let optionString = "options." + option
          ref = ref.where(optionString, "==", true)
        })
      }

      this.unsubscribe = ref.onSnapshot((sn) => {
        if (sn.empty) {
          this.storeList = []
          return
        }
        this.setStoreList(sn)
      })
    },
    setStoreList(sn) {
      this.storeList = sn.docs.map((v) => {
        const store = v.data()
        const ot = store.operatingTime
        return {
          storeId: v.id,
          createdAt: store.createdAt.toDate(),
          // createdAt: store.createdAt.toDate().toLocaleString(),
          storeNameKor: store.storeNameKor,
          storeNameEng: store.storeNameEng,
          branchName: store.branchName,
          address: store.address,
          addressLocation: store.addressJibun.split(" ")[2],
          lowFloor: store.lowFloor,
          highFloor: store.highFloor,
          lat: store.lat,
          lng: store.lng,
          distance: this.calcDistance(store.lat, store.lng) || -1,
          phoneNumber: store.phoneNumber,
          instagram: store.instagram,
          viewCount: store.viewCount,
          reviewCount: store.reviewCount,
          rating: store.rating,
          seatCount: store.seatCount,
          likeUserCount: store.likeUserCount,
          likeUserList: store.likeUserList,
          bookmarkUserCount: store.bookmarkUserCount,
          bookmarkUserList: store.bookmarkUserList,
          sentimentUserCount: store.sentimentUserCount,
          sentimentUserList: store.sentimentUserList,

          operatingTimeInfo: store.operatingTimeInfo,
          operatingTimeTip: store.operatingTimeTip,
          operatingTime: [
            { open: ot?.openSun, openTime: ot?.openTimeSun, closeTime: ot?.closeTimeSun },
            { open: ot?.openMon, openTime: ot?.openTimeMon, closeTime: ot?.closeTimeMon },
            { open: ot?.openTue, openTime: ot?.openTimeTue, closeTime: ot?.closeTimeTue },
            { open: ot?.openWed, openTime: ot?.openTimeWed, closeTime: ot?.closeTimeWed },
            { open: ot?.openThu, openTime: ot?.openTimeThu, closeTime: ot?.closeTimeThu },
            { open: ot?.openFri, openTime: ot?.openTimeFri, closeTime: ot?.closeTimeFri },
            { open: ot?.openSat, openTime: ot?.openTimeSat, closeTime: ot?.closeTimeSat },
          ],
          options: store.options,
          parkingTip: store.parkingTip,
        }
      })
    },
    calcDistance(lat2, lng2) {
      let lat1 = this.currentLat
      let lng1 = this.currentLng

      if (!(lat2 || lng2)) {
        return
      }

      function deg2rad(deg) {
        return deg * (Math.PI / 180)
      }
      var r = 6371 //지구의 반지름(km)
      var dLat = deg2rad(lat2 - lat1)
      var dLon = deg2rad(lng2 - lng1)
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      var d = r * c // Distance in km
      // console.log(Math.round(d * 1000))
      return Math.round(d * 1000)
    },
    openFilterDialog() {
      this.filterDialogToggle = true
    },
    closeFilterDialog() {
      this.filterDialogToggle = false
    },
    searchBtnClicked() {
      console.log("searchBtnClicked")
    },
    applyFilter(optionList) {
      this.optionList = optionList
      this.subscribe()
    },
    // async save() {
    //   console.log("save@@@")
    //   try {
    //     await this.$firebase
    //       .database()
    //       .ref()
    //       .child("abcd")
    //       .child("abcd")
    //       .child("abcd")
    //       .set({
    //         title: "abcd",
    //         text: "tttttt",
    //       })
    //   } finally {
    //     this.dialog = false
    //   }
    // },

    // read() {
    //   this.$firebase
    //     .database()
    //     .ref()
    //     .child("abcd")
    //     .on("value", (sn) => {
    //       console.log(sn)
    //       console.log(sn.val())
    //     })
    // },
  },
}
</script>

<style></style>
