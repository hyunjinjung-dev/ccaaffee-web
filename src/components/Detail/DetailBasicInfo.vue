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
            <v-flex sm6 xs12 :class="{ borderRight: !breakPointXs }">
              <v-list-item>
                <v-list-item-avatar>
                  <v-avatar color="secondary" size="40px">
                    <v-icon color="white">mdi-door-open</v-icon>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <!-- To Do 전화 번호 복사 기능 만들기-->
                  <v-list-item-title>
                    오픈 일자
                  </v-list-item-title>
                  <v-list-item-subtitle class="info--text" v-if="store.since">
                    Since {{ store.since }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="info--text" v-else>
                    정보를 입력해주세요
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-flex>

            <v-flex sm6 xs12>
              <v-list-item>
                <v-list-item-avatar>
                  <v-avatar color="secondary" size="40px">
                    <v-icon color="white">mdi-seat</v-icon>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    좌석 수
                  </v-list-item-title>
                  <v-list-item-subtitle class="info--text" v-if="store.seatCount">
                    {{ store.seatCount }} 석
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="info--text" v-else>
                    정보를 입력해주세요
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-flex>

            <v-flex sm6 xs12 :class="{ borderRight: !breakPointXs }">
              <v-list-item>
                <v-list-item-avatar>
                  <v-avatar color="secondary" size="40px">
                    <v-icon color="white">mdi-phone</v-icon>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <!-- To Do 전화 번호 복사 기능 만들기-->
                  <v-list-item-title>
                    전화 번호
                  </v-list-item-title>
                  <v-list-item-subtitle class="info--text" v-if="store.phoneNumber">
                    {{ store.phoneNumber }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="info--text" v-else>
                    정보를 입력해주세요
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-flex>

            <v-flex sm6 xs12>
              <v-list-item>
                <v-list-item-avatar>
                  <v-avatar color="secondary" size="40px">
                    <v-icon color="white">mdi-instagram</v-icon>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <!-- To Do 인스타그램 연결 링크 만들기 -->
                  <v-list-item-title>
                    인스타그램
                  </v-list-item-title>
                  <v-list-item-subtitle class="info--text" v-if="store.instagram">
                    @{{ store.instagram }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="info--text" v-else>
                    정보를 입력해주세요
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-flex>
          </v-layout>
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
