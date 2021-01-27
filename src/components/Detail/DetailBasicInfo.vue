<template>
  <v-card tag="section">
    <detail-card-bar
      :title="title"
      :store="store"
      @expandToggle="expandToggle"
      @updateBtnClicked="openUpdateDialog"
    ></detail-card-bar>

    <v-expand-transition>
      <v-card-text class="pa-0" v-show="expand">
        <v-list dense>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar color="secondary" size="40px">
                <v-icon color="white">mdi-phone</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-if="store.phoneNumber">
                {{ store.phoneNumber }}
              </v-list-item-title>
              <v-list-item-subtitle class="info--text" v-else>
                정보를 입력해주세요
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar color="secondary" size="40px">
                <v-icon color="white">mdi-instagram</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-if="store.instagram">{{ store.instagram }}</v-list-item-title>
              <v-list-item-subtitle class="info--text" v-else>
                정보를 입력해주세요
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar color="secondary" size="40px">
                <v-icon color="white">mdi-seat</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-if="store.seatCount">{{ store.seatCount }} 석</v-list-item-title>
              <v-list-item-subtitle class="info--text" v-else>
                정보를 입력해주세요
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-expand-transition>

    <detail-basic-info-update
      v-if="updateDialog"
      :title="title"
      :store="store"
      :dialog="updateDialog"
      @closeBtnClicked="closeUpdateDialog"
    ></detail-basic-info-update>
  </v-card>
</template>

<script>
import DetailCardBar from "@/components/Detail/DetailCardBar.vue"
import DetailBasicInfoUpdate from "@/components/Detail/DetailBasicInfoUpdate.vue"

export default {
  name: "DetailBasicInfo",
  props: ["store"],
  components: {
    DetailCardBar,
    DetailBasicInfoUpdate,
  },
  data() {
    return {
      title: "기본 정보",
      expand: true,
      updateDialog: false,
    }
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

<style></style>
