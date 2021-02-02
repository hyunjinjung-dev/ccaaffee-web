<template>
  <div>
    <v-layout :class="this.$vuetify.breakpoint.xs ? 'ma-0' : 'ma-5'" style="border: 2px solid red;">
      <v-flex xs12 style="border: 2px solid green">
        <v-layout wrap align-end style="border: 2px solid blue">
          <v-flex md8 sm12 xs12 shrink style="border: 2px solid red">
            <v-btn icon color="info" class="mr-2" @click="$router.go(-1)">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span class="mx-2 font-weight-bold title">{{ store.storeNameKor }}</span>
            <span>{{ store.branchName }}</span>
            <span class="grey--text lighten-2">Wed 11 Sep 2019 OPEN</span>
            <v-btn color="info" fab dark x-small class="mx-3" depressed>
              <v-icon dark>mdi-clock-fast</v-icon>
            </v-btn>
          </v-flex>

          <v-flex md4 sm12 xs12 shrink style="border: 2px solid red" class="py-1">
            <!-- <v-menu offset-y left>
              <template #activator="{ on }">
                <v-btn color="info" v-on="on" class="mx-2">
                  <v-icon left>mdi-plus-circle</v-icon>
                  <span>Quick</span>
                </v-btn>
              </template>
              <v-list dense>
                <template v-for="(item, index) in quickAddItems">
                  <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

                  <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                  <v-list-item v-else :key="item.title">
                    <v-list-item-avatar>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>{{ item.title }}</v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu> -->

            <!-- :flat="!showQuickActions" -->
            <v-layout wrap align-end justify-space-around>
              <!-- <v-flex xs3 style="text-align: center;">
                <v-btn
                  @click="showQuickActions = !showQuickActions"
                  :outlined="showQuickActions"
                  color="info"
                  class="mx-2"
                >
                  <v-icon left>{{
                    showQuickActions ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                  <span>Q</span>
                </v-btn>
              </v-flex> -->

              <v-flex xs3 style="text-align: center;">
                <v-btn height="56" fab>
                  <div class="pa-1">
                    <div class="pb-1">
                      <v-icon>mdi-heart-outline</v-icon>
                    </div>
                    <small style="display: block;">
                      1200
                    </small>
                  </div>
                </v-btn>
              </v-flex>

              <v-flex xs3 style="text-align: center;">
                <v-btn height="56" fab>
                  <div class="pa-1">
                    <div class="pb-1">
                      <v-icon>mdi-bookmark-outline</v-icon>
                    </div>
                    <small style="display: block;">
                      1200
                    </small>
                  </div>
                </v-btn>
              </v-flex>

              <v-flex xs3 style="text-align: center;">
                <v-tooltip v-model="visitTooltip" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="included"
                      v-bind="attrs"
                      v-on="on"
                      :color="sentimentColor"
                      height="56"
                      fab
                      @click="selectSentimentClicked"
                      :loading="pinLoading"
                      :disabled="pinLoading"
                    >
                      <div class="pa-1">
                        <div class="pb-1">
                          <v-icon v-if="userSentiment == 1">mdi-emoticon-sad-outline</v-icon>
                          <v-icon v-else-if="userSentiment == 2"
                            >mdi-emoticon-neutral-outline</v-icon
                          >
                          <v-icon v-else-if="userSentiment == 3">mdi-emoticon-happy-outline</v-icon>
                          <v-icon v-else-if="userSentiment == 4">mdi-emoticon-kiss-outline</v-icon>
                          <v-icon v-else>mdi-head-question-outline</v-icon>
                        </div>
                        <small style="display: block;">
                          1200
                        </small>
                      </div>
                    </v-btn>
                  </template>
                  <span>방문하신 적이 있나요?</span>
                </v-tooltip>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-expand-transition>
          <v-layout v-show="showQuickActions" style="border: 2px solid blue">
            <quick-actions></quick-actions>
          </v-layout>
        </v-expand-transition>

        <v-expand-transition>
          <v-layout v-show="showMobileSentiment" style="border: 2px solid yellow">
            <detail-select-sentiment
              v-click-outside="{
                handler: onClickOutside,
                include: include,
              }"
              :store="store"
              @sentimentSelected="sentimentSelected"
            ></detail-select-sentiment>
          </v-layout>
        </v-expand-transition>

        <v-layout wrap style="border: 2px solid blue">
          <v-flex md8 sm12 xs12 style="border: 2px solid red" class="pa-1">
            <detail-image></detail-image>
            <detail-basic-info :store="store"></detail-basic-info>
            <detail-operating-time :store="store"></detail-operating-time>
            <detail-options :store="store"></detail-options>
            <detail-location :store="store"></detail-location>
            <detail-menu :store="store"></detail-menu>
          </v-flex>
          <v-flex md4 sm12 xs12 style="border: 2px solid red" class="pa-1">
            <detail-sentiment :store="store"></detail-sentiment>
            <detail-review></detail-review>
            <!-- <dashboard-whos-got-time-off></dashboard-whos-got-time-off> -->
            <!-- <dashboard-whos-celebrating></dashboard-whos-celebrating> -->
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex"
import QuickActions from "../components/modules/Dashboard/QuickActions.vue"
import DetailSelectSentiment from "@/components/Detail/DetailSelectSentiment.vue"

import DetailImage from "@/components/Detail/DetailImage.vue"
import DetailBasicInfo from "@/components/Detail/DetailBasicInfo.vue"
import DetailOperatingTime from "@/components/Detail/DetailOperatingTime.vue"
import DetailOptions from "@/components/Detail/DetailOptions.vue"
import DetailLocation from "@/components/Detail/DetailLocation.vue"
import DetailMenu from "@/components/Detail/DetailMenu.vue"

import DetailSentiment from "@/components/Detail/DetailSentiment.vue"
import DetailReview from "@/components/Detail/DetailReview.vue"

export default {
  props: {},
  components: {
    QuickActions,
    DetailSelectSentiment,

    DetailImage,
    DetailBasicInfo,
    DetailOperatingTime,
    DetailOptions,
    DetailLocation,
    DetailMenu,

    DetailSentiment,
    DetailReview,
  },
  data() {
    return {
      pageTitle: "Today",
      showQuickActions: false,
      showMobileSentiment: false,
      visitTooltip: false,
      pinLoading: false,
      userSentiment: 0,

      storeId: this.$route.params.storeId,
      store: {},
      unsubcribe: null,
      ref: this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
        .collection("cafe"),

      quickAddItems: [
        {
          header: "Communications",
        },
        {
          icon: "mdi-refresh",
          route: "create-article",
          title: "Add article",
        },
        {
          icon: "mdi-refresh",
          route: "create-survey",
          title: "Add survey",
        },
        { divider: true, inset: false },
        {
          header: "People",
        },
        {
          icon: "mdi-home",
          route: "create-group",
          title: "Add group",
        },
        {
          icon: "mdi-account",
          route: "create-person",
          title: "Add person",
        },
        {
          icon: "mdi-refresh",
          route: "create-role",
          title: "Add role",
        },
        {
          icon: "mdi-star",
          route: "create-skill",
          title: "Add skill",
        },
        { divider: true, inset: false },
        {
          header: "Performance",
        },
        {
          icon: "mdi-refresh",
          route: "create-objective",
          title: "Add objective",
        },
        {
          icon: "mdi-refresh",
          route: "create-review",
          title: "Add review",
        },
        { divider: true, inset: false },
        {
          header: "Other",
        },
        {
          icon: "mdi-refresh",
          route: "create-absence",
          title: "Add absence",
        },
        {
          icon: "mdi-refresh",
          route: "create-task",
          title: "Add task",
        },
      ],
    }
  },
  async created() {
    await this.readCountUpdate()
    await this.subscribe()
  },
  mounted() {
    setTimeout(() => {
      this.visitTooltip = true
    }, 1000)
    setTimeout(() => {
      this.visitTooltip = false
    }, 3000)
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  computed: {
    ...mapState(["fireUser", "parkingTags", "offerTags", "policyTags", "amenityTags", "themeTags"]),
    sentimentColor() {
      if (this.userSentiment == 0) {
        return "white"
      } else {
        return "error"
      }
    },
  },
  methods: {
    selectSentimentClicked() {
      if (this.fireUser) {
        this.showMobileSentiment = !this.showMobileSentiment
        this.pinLoading = true
      } else {
        this.$toast.error("로그인이 필요해요")
      }
    },
    hideVisitTooltip() {
      setTimeout(() => {
        // Code here
      }, 1000)
    },
    sentimentSelected(rate) {
      this.showMobileSentiment = false
      this.pinLoading = false
      this.userSentiment = rate
    },
    onClickOutside() {
      this.showMobileSentiment = false
      this.pinLoading = false
    },
    include() {
      return [document.querySelector(".included")]
    },
    async readCountUpdate() {
      await this.ref.doc(this.storeId).update({
        viewCount: this.$firebase.firestore.FieldValue.increment(1),
      })
    },
    async subscribe() {
      if (this.unsubscribe) {
        this.unsubscribe()
      }

      this.unsubscribe = await this.ref.doc(this.storeId).onSnapshot((doc) => {
        if (!doc.exists) {
          this.back()
          return
        }
        const item = doc.data()
        item.createdAt = item.createdAt.toDate()
        this.store = item
        this.store.storeId = this.storeId
        if (this.store.operatingTime) {
          const ot = this.store.operatingTime
          this.store.operatingTime = [
            { open: ot.openSun, openTime: ot.openTimeSun, closeTime: ot.closeTimeSun },
            { open: ot.openMon, openTime: ot.openTimeMon, closeTime: ot.closeTimeMon },
            { open: ot.openTue, openTime: ot.openTimeTue, closeTime: ot.closeTimeTue },
            { open: ot.openWed, openTime: ot.openTimeWed, closeTime: ot.closeTimeWed },
            { open: ot.openThu, openTime: ot.openTimeThu, closeTime: ot.closeTimeThu },
            { open: ot.openFri, openTime: ot.openTimeFri, closeTime: ot.closeTimeFri },
            { open: ot.openSat, openTime: ot.openTimeSat, closeTime: ot.closeTimeSat },
          ]
        }
        if (this.store.options) {
          this.store.selectedParkingTags = []
          this.store.selectedOfferTags = []
          this.store.selectedPolicyTags = []
          this.store.selectedAmenityTags = []
          this.store.selectedThemeTags = []

          for (let item in this.store.options) {
            if (this.parkingTags.includes(item)) {
              this.store.selectedParkingTags.push(item)
              continue
            }
            if (this.offerTags.includes(item)) {
              this.store.selectedOfferTags.push(item)
              continue
            }
            if (this.policyTags.includes(item)) {
              this.store.selectedPolicyTags.push(item)
              continue
            }
            if (this.amenityTags.includes(item)) {
              this.store.selectedAmenityTags.push(item)
              continue
            }
            if (this.themeTags.includes(item)) {
              this.store.selectedThemeTags.push(item)
              continue
            }
          }
        }
        if (this.store.lat) {
          this.store.lat = Number(this.store.lat)
        }
        if (this.store.lng) {
          this.store.lng = Number(this.store.lng)
        }
        if (this.store.sentiment) {
          let arr = [
            this.store.sentiment.first,
            this.store.sentiment.second,
            this.store.sentiment.third,
            this.store.sentiment.fourth,
          ]
          this.store.sentiment = arr
        }
      }, console.error)
    },
  },
}
</script>

<style scoped>
.v-card {
  margin-top: 10px;
}
.v-list-item {
  height: 22px !important;
  font-size: 13px;
}
</style>
