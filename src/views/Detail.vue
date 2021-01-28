<template>
  <div>
    <v-layout :class="this.$vuetify.breakpoint.xs ? 'ma-0' : 'ma-5'" style="border: 2px solid red;">
      <v-flex xs12 style="border: 2px solid green">
        <v-layout wrap align-end style="border: 2px solid blue">
          <v-flex md6 sm12 xs12 shrink style="border: 2px solid red">
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

          <v-flex md6 sm12 xs12 shrink style="border: 2px solid red">
            <v-menu offset-y left>
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
            </v-menu>

            <!-- :flat="!showQuickActions" -->
            <v-btn
              @click="showQuickActions = !showQuickActions"
              :outlined="showQuickActions"
              color="info"
              class="mx-2"
            >
              <v-icon left>{{ showQuickActions ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
              <span>Quick</span>
            </v-btn>

            <!-- <v-divider class="mx-2" vertical color="black" /> -->

            <v-btn icon>
              <v-icon color="info">mdi-refresh</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="info">mdi-swap-vertical</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-expand-transition>
          <v-layout v-show="showQuickActions" style="border: 2px solid blue">
            <quick-actions></quick-actions>
          </v-layout>
        </v-expand-transition>

        <v-layout wrap style="border: 2px solid blue">
          <v-flex sm8 xs12 style="border: 2px solid red">
            <detail-image></detail-image>
            <detail-basic-info :store="store"></detail-basic-info>
            <detail-operating-time :store="store"></detail-operating-time>
            <detail-options :store="store"></detail-options>
            <detail-location :store="store"></detail-location>
            <detail-menu :store="store"></detail-menu>

            <dashboard-time-off></dashboard-time-off>
            <dashboard-what-needs-doing></dashboard-what-needs-doing>
            <dashboard-whats-coming-up></dashboard-whats-coming-up>
            <!-- <dashboard-performance></dashboard-performance> -->
          </v-flex>
          <v-flex sm4 xs12 style="border: 2px solid red">
            <detail-sentiment></detail-sentiment>
            <detail-review></detail-review>
            <!-- <dashboard-sentiment></dashboard-sentiment> -->
            <!-- <dashboard-whos-got-time-off></dashboard-whos-got-time-off> -->
            <!-- <dashboard-whos-celebrating></dashboard-whos-celebrating> -->
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- <div :class="this.$vuetify.breakpoint.xs ? '' : 'ma-5'">
    <v-row justify="center" class="mb-10">
      <v-expansion-panels accordion flat>
        <v-expansion-panel v-for="(item, i) in 5" :key="i">
          <v-expansion-panel-header>Item</v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <div>
      this is detail
    </div>
    <div>storeID : {{ this.storeId }}</div>
    <div>storeNameKor : {{ this.store.storeNameKor }}</div>
  </div> -->
  </div>
</template>

<script>
import QuickActions from "../components/modules/Dashboard/QuickActions.vue"
import DashboardTimeOff from "../components/modules/Dashboard/TimeOff.vue"
import DashboardWhatNeedsDoing from "../components/modules/Dashboard/WhatNeedsDoing.vue"
import DashboardWhatsComingUp from "../components/modules/Dashboard/WhatsComingUp.vue"

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
    DashboardTimeOff,
    DashboardWhatNeedsDoing,
    DashboardWhatsComingUp,

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
      showQuickActions: false,

      // 여기까지

      storeId: this.$route.params.storeId,
      store: {},
      unsubcribe: null,
      ref: this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
        .collection("cafe"),
    }
  },
  async created() {
    await this.readCountUpdate()
    this.subscribe()
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  methods: {
    async readCountUpdate() {
      await this.ref.doc(this.storeId).update({
        viewCount: this.$firebase.firestore.FieldValue.increment(1),
      })
    },
    subscribe() {
      if (this.unsubscribe) {
        this.unsubscribe()
      }
      this.unsubscribe = this.ref.doc(this.storeId).onSnapshot((doc) => {
        if (!doc.exists) {
          this.back()
          return
        }
        const item = doc.data()
        item.createdAt = item.createdAt.toDate()
        this.store = item
        this.store.storeId = this.storeId
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
