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
        <v-container v-if="store.menus" class="px-2 px-5">
          <v-sheet v-for="(menu, index) in store.menus" :key="index" class="mb-1">
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
