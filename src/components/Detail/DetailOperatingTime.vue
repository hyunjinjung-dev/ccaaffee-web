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
        <v-layout wrap class="py-2 px-4">
          <v-flex sm6 xs12 :class="{ borderRight: !breakPointXs }">
            <v-flex xs12>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      이 시각 운영
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="store.operatingTimeInfo">
                      hell
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="info--text" v-else>
                      정보를 입력해주세요
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-flex>
            <v-flex xs12 style="border-bottom:1px solid #EEEE;"></v-flex>
            <v-flex xs12>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      운영 정보 팁
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="store.operatingTimeInfo">
                      hell
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="info--text" v-else>
                      정보를 입력해주세요
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-flex>
          </v-flex>
          <v-flex xs12 v-if="breakPointXs" style="border-bottom:1px solid #EEEE;"></v-flex>

          <!-- 시간 받을 때
                    https://wickedmagic.tistory.com/578 -->

          <v-flex sm6 xs12>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    요일별 운영시간
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="!store.operatingTimeInfo">
                    <v-container>
                      <v-row>
                        <v-col>hell</v-col>
                        <v-col>hell</v-col>
                      </v-row>
                      <v-row>
                        <v-col>hell</v-col>
                        <v-col>hell</v-col>
                      </v-row>
                    </v-container>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="info--text" v-else>
                    정보를 입력해주세요
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
        </v-layout>
        <!-- <v-list dense>
          <v-list-item>
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
                <span color="white">
                  월
                </span>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-if="store.seatCount">{{ store.seatCount }} 석</v-list-item-title>
              <v-list-item-subtitle class="info--text" v-else>
                정보를 입력해주세요
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list> -->
      </v-card-text>
    </v-expand-transition>

    <detail-operating-time-update
      v-if="updateDialog"
      :title="title"
      :store="store"
      :dialog="updateDialog"
      @closeBtnClicked="closeUpdateDialog"
    ></detail-operating-time-update>
  </v-card>
</template>

<script>
import DetailCardBar from "@/components/Detail/DetailCardBar.vue"
import DetailOperatingTimeUpdate from "@/components/Detail/DetailOperatingTimeUpdate.vue"

export default {
  name: "DetailOperatingTime",
  props: ["store"],
  components: {
    DetailCardBar,
    DetailOperatingTimeUpdate,
  },
  data() {
    return {
      title: "운영 시간",
      expand: true,
      updateDialog: false,

      dayLabels: ["월", "화", "수", "목", "금", "토", "일"],
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
