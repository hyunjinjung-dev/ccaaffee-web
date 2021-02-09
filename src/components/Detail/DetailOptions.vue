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
          <v-list-item v-for="(item, index) in options" :key="index">
            <v-list-item-avatar>
              <!-- <v-avatar color="secondary" size="40px">
                <v-icon color="white">{{ item.icon }}</v-icon> -->
              <v-avatar size="40px">
                {{ item.icon }}
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
                <span
                  v-if="item.type == 'selectedParkingTags' && store.parkingTip"
                  class="info--text text-wrap"
                >
                  : {{ store.parkingTip }}
                </span>
              </v-list-item-title>
              <v-sheet v-if="store[item.type] != undefined && store[item.type].length > 0">
                <v-list-item-subtitle class="info--text text-wrap">
                  <!-- <v-list-item-subtitle
                    v-if="item.type == 'selectedParkingTags' && store.parkingTip"
                    class="info--text text-wrap"
                  >
                    {{ store.parkingTip }}
                  </v-list-item-subtitle> -->
                  <span
                    class="mr-1 info-text"
                    v-for="(tag, index) in store[item.type]"
                    :key="index"
                  >
                    {{ tag }}
                  </span>
                  <!-- <v-btn
                    class="mr-1 mb-1"
                    depressed
                    small
                    color="primary"
                    outlined
                    rounded
                    v-for="(tag, index) in store[item.type]"
                    :key="index"
                    :value="tag"
                    >{{ tag }}
                  </v-btn> -->
                </v-list-item-subtitle>
              </v-sheet>
              <v-sheet v-else>
                <v-list-item-subtitle class="info--text">
                  정보를 입력해주세요
                </v-list-item-subtitle>
              </v-sheet>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-expand-transition>

    <detail-options-update
      v-if="updateDialog"
      :title="title"
      :store="store"
      :dialog="updateDialog"
      @closeBtnClicked="closeUpdateDialog"
    ></detail-options-update>
  </v-card>
</template>

<script>
import DetailCardBar from "@/components/Detail/DetailCardBar.vue"
import DetailOptionsUpdate from "@/components/Detail/DetailOptionsUpdate.vue"

export default {
  name: "DetailBasicInfo",
  props: ["store"],
  components: {
    DetailCardBar,
    DetailOptionsUpdate,
  },
  data() {
    return {
      title: "추가 정보",
      expand: true,
      updateDialog: false,
      options: [
        // { icon: "mdi-car-arrow-right", title: "주차", type: "selectedParkingTags" },
        // { icon: "mdi-offer", title: "제공", type: "selectedOfferTags" },
        // { icon: "mdi-bookshelf", title: "정책", type: "selectedPolicyTags" },
        // { icon: "mdi-bulletin-board", title: "편의", type: "selectedAmenityTags" },
        // { icon: "mdi-camera-iris", title: "테마", type: "selectedThemeTags" },
        { icon: "🚘", title: "주차", type: "selectedParkingTags" },
        { icon: "🤲🏼", title: "제공", type: "selectedOfferTags" },
        { icon: "📚", title: "정책", type: "selectedPolicyTags" },
        { icon: "🎛", title: "편의", type: "selectedAmenityTags" },
        { icon: "🎞", title: "테마", type: "selectedThemeTags" },
      ],
    }
  },
  // create() {
  //   this.fetch()
  // },
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
  methods: {
    // fetch() {
    //   this.options = [
    //     { icon: "mdi-car-arrow-right", title: "주차", type: "selectedParkingTags" },
    //     { icon: "mdi-offer", title: "제공", type: "selectedOfferTags" },
    //     { icon: "mdi-bookshelf", title: "정책", type: "selectedPolicyTags" },
    //     { icon: "mdi-bulletin-board", title: "편의", type: "selectedAmenityTags" },
    //     { icon: "mdi-camera-iris", title: "테마", type: "selectedThemeTags" },
    //   ]
    // },
    // lengthCheck(index) {
    //   if (this.options[index].length > 0) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    expandToggle() {
      this.expand = !this.expand
    },
    openUpdateDialog() {
      this.updateDialog = true
    },
    closeUpdateDialog() {
      this.updateDialog = false
    },
  },
}
</script>

<style>
.borderRight {
  border-right: 1px solid #eeee;
}
</style>
