<template>
  <v-card tag="section">
    <detail-card-bar
      :title="title"
      :store="store"
      :expand="expand"
      @expandToggle="expandToggle"
      @updateBtnClicked="openUpdateDialog"
    ></detail-card-bar>

    <v-expand-transition>
      <v-card-text class="pa-0" v-show="expand">
        <v-list dense>
          <v-list-item>
            <v-list-item-avatar>
              <!-- <v-avatar color="secondary" size="40px">
                <v-icon color="white">mdi-map-marker</v-icon> -->
              <v-avatar size="40px">
                📍
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>주소</v-list-item-title>
              <v-list-item-subtitle
                class="info--text"
                v-if="store.address"
                @click="copyText(store.address, '주소가')"
                style="cursor:pointer"
              >
                <span v-if="store.lowFloor !== store.highFloor">
                  {{ store.address }}
                  <span v-if="store.lowFloor > 0"> {{ store.lowFloor }}층 </span>
                  <span v-else>지하 {{ -store.lowFloor }}층</span>
                  ~
                  <span v-if="store.highFloor > 0"> {{ store.highFloor }}층 </span>
                  <span v-else>지하 {{ -store.highFloor }}층</span>
                </span>
                <span v-else>
                  {{ store.address }}
                  <span v-if="store.lowFloor > 0"> {{ store.lowFloor }}층 </span>
                  <span v-else>지하 {{ -store.lowFloor }}층</span>
                </span>
              </v-list-item-subtitle>
              <v-list-item-subtitle class="info--text" v-else>
                정보를 입력해주세요
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="my-2">
            <!-- v-list-item 태그가 자동으로 naver-map 태그 사이즈 조절 -->
            <naver-maps
              v-if="store.lat && store.lng && mapOptions.lat && mapOptions.lng"
              ref="maps"
              :width="mapWidth"
              :height="mapHeight"
              :mapOptions="mapOptions"
              :initLayers="initLayers"
              @load="onLoad"
            >
              <naver-marker
                :lat="mapOptions.lat"
                :lng="mapOptions.lng"
                @click="onMarkerClicked"
                @load="onMarkerLoaded"
              ></naver-marker>
            </naver-maps>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-expand-transition>

    <detail-location-update
      v-if="updateDialog"
      :title="title"
      :store="store"
      :dialog="updateDialog"
      @closeBtnClicked="closeUpdateDialog"
    ></detail-location-update>
  </v-card>
</template>

<script>
import DetailCardBar from "@/components/Detail/DetailCardBar.vue"
import DetailLocationUpdate from "@/components/Detail/DetailLocationUpdate.vue"

export default {
  name: "DetailBasicInfo",
  props: ["store"],
  components: {
    DetailCardBar,
    DetailLocationUpdate,
  },
  data() {
    return {
      title: "위치 정보",
      expand: true,
      updateDialog: false,

      // 지도
      mapWidth: 3000,
      mapHeight: 300,
      info: false,
      marker: null,
      count: 1,
      map: null,
      isCTT: false,
      mapOptions: {
        lat: this.store.lat,
        lng: this.store.lng,
        zoom: 16,
        scaleControl: false,
        zoomControl: true,
        // 도큐먼트와는 다르게 style, position을 Number로 세팅해야한다.
        zoomControlOptions: { style: 2, position: 8 },
        mapTypeControl: false,
      },
      initLayers: [
        "BACKGROUND",
        "BACKGROUND_DETAIL",
        "POI_KOREAN",
        "TRANSIT",
        "ENGLISH",
        "CHINESE",
        "JAPANESE",
      ],
    }
  },
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
  watch: {
    store: {
      deep: true,
      handler(newVal) {
        if (this.mapOptions.lat != newVal.lat || this.mapOptions.lng != newVal.lng) {
          this.mapOptions.lat = newVal.lat
          this.mapOptions.lng = newVal.lng
          this.setCenterMap(newVal.lat, newVal.lng)
        }
      },
    },
  },
  methods: {
    copyText(val, subject) {
      const tempElem = document.createElement("textarea")
      tempElem.value = val
      document.body.appendChild(tempElem)

      tempElem.select()
      document.execCommand("copy")
      document.body.removeChild(tempElem)
      this.$toast(subject + " 클립보드로 복사되었어요 🤓")
    },
    expandToggle() {
      this.expand = !this.expand
    },
    openUpdateDialog() {
      this.updateDialog = true
    },
    closeUpdateDialog() {
      this.updateDialog = false
    },
    // 네이버 지도
    setCenterMap(lat, lng) {
      if (this.map) {
        this.map.setCenter(lat, lng)
      }
    },

    onLoad(vue) {
      this.map = vue
    },
    onWindowLoad(that) {
      console.log(that)
    },
    onMarkerClicked(event) {
      this.info = !this.info
      console.log(event)
    },
    onMarkerLoaded(vue) {
      this.marker = vue.marker
    },
  },
}
</script>

<style>
.borderRight {
  border-right: 1px solid #eeee;
}
</style>
