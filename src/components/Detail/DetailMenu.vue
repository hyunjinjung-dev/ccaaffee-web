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
          <v-layout wrap>
            <v-flex sm6 xs12 v-if="store.menusLeft">
              <v-list-item v-for="(menu, index) in store.menusLeft" :key="index">
                <v-list-item-content class="py-1" v-if="menu.name == '구분선'">
                  <v-listitem-title>
                    <v-divider></v-divider>
                  </v-listitem-title>
                </v-list-item-content>

                <v-list-item-content class="py-1" v-else>
                  <v-list-item-title class="text-wrap">
                    <span>{{ menu.name }}</span>
                    <span class="mx-1"> ••• </span>
                    <span>{{ menu.price | comma }}</span>
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-wrap">
                    <span class="info--text">{{ menu.describe }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-flex>

            <v-flex sm6 xs12 v-if="store.menusRight">
              <v-list-item v-for="(menu, index) in store.menusRight" :key="index">
                <v-list-item-content class="py-1" v-if="menu.name == '구분선'">
                  <v-listitem-title>
                    <v-divider></v-divider>
                  </v-listitem-title>
                </v-list-item-content>

                <v-list-item-content class="py-1" v-else>
                  <v-list-item-title class="text-wrap">
                    <span>{{ menu.name }}</span>
                    <span class="mx-1"> ••• </span>
                    <span>{{ menu.price | comma }}</span>
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-wrap">
                    <span class="info--text">{{ menu.describe }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-flex>

            <v-flex sm6 xs12 v-if="!store.menusLeft && !store.menuRight">
              <v-list-item>
                <v-list-item-content class="py-1">
                  <v-list-item-subtitle class="info--text">
                    정보를 입력해주세요
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-flex>
            <v-flex>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    📌 메뉴 및 가격은 매장의 사정에 따라 기재된 내용과 달라질 수 있어요
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-flex>
          </v-layout>
        </v-list>
        <!-- <v-container v-if="store.menusLeft" class="py-2 px-4">
          <v-sheet v-for="(menu, index) in store.menusLeft" :key="index" class="mb-1">
            <v-row no-gutters>
              <v-col>
                <span>{{ menu.name }}</span>
                <span class="mx-1"> ••• </span>
                <span>{{ menu.price | comma }}</span>
              </v-col>
            </v-row>
            <v-row no-gutters v-if="menu.describe">
              <v-col>
                <span class="info--text">{{ menu.describe }}</span>
              </v-col>
            </v-row>
          </v-sheet>
        </v-container>
        <v-container v-else class="px-2 px-5">
          정보를 입력해주세요
        </v-container>
        <v-container v-if="store.menusRight" class="py-2 px-4">
          <v-sheet v-for="(menu, index) in store.menusRight" :key="index" class="mb-1">
            <v-row no-gutters>
              <v-col>
                <span>{{ menu.name }}</span>
                <span class="mx-1"> ••• </span>
                <span>{{ menu.price | comma }}</span>
              </v-col>
            </v-row>
            <v-row no-gutters v-if="menu.describe">
              <v-col>
                <span class="info--text">{{ menu.describe }}</span>
              </v-col>
            </v-row>
          </v-sheet>
        </v-container>
        <v-container v-else class="px-2 px-5">
          정보를 입력해주세요
        </v-container> -->
      </v-card-text>
    </v-expand-transition>

    <detail-menu-update
      v-if="updateDialog"
      :title="title"
      :store="store"
      :dialog="updateDialog"
      @closeBtnClicked="closeUpdateDialog"
    ></detail-menu-update>
  </v-card>
</template>

<script>
import DetailCardBar from "@/components/Detail/DetailCardBar.vue"
import DetailMenuUpdate from "@/components/Detail/DetailMenuUpdate.vue"

export default {
  name: "DetailBasicInfo",
  props: ["store"],
  components: {
    DetailCardBar,
    DetailMenuUpdate,
  },
  data() {
    return {
      title: "메뉴판",
      expand: true,
      updateDialog: false,
    }
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
  },
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
  methods: {
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
