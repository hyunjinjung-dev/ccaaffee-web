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
                    <v-list-item-subtitle v-if="store.operatingTimeInfo" class="pa-2">
                      <detail-operating-time-calc
                        :operatingTime="store.operatingTime"
                      ></detail-operating-time-calc>
                      <span>상황에 따라 운영 시간이 변경 될 수 있습니다</span>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="info--text pa-lg-12" v-else>
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
                    <v-list-item-subtitle v-if="store.operatingTimeTip" class="pa-2">
                      {{ store.operatingTimeTip }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="info--text pa-2" v-else>
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
                  <v-list-item-subtitle v-if="store.operatingTimeInfo" class="pa-2">
                    <v-container class="pa-0 ma-0">
                      <v-row
                        v-for="(item, index) in store.operatingTime"
                        :key="index"
                        no-gutters
                        :class="{ 'font-weight-black': boldToday(index) }"
                      >
                        <template v-if="item.open">
                          <v-col>
                            <span class="mr-2">{{ dayLabels[index] }}</span>
                            <span>{{ stringfyTime(item.openTime) }}</span>
                            <span class="mx-1">-</span>
                            <span>{{ stringfyTime(item.closeTime) }}</span>
                          </v-col>
                        </template>
                        <template v-else>
                          <v-col>
                            <span class="mr-2">{{ dayLabels[index] }}</span>
                            <span class="error--text">휴무</span>
                          </v-col>
                        </template>
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
import DetailOperatingTimeCalc from "@/components/Detail/DetailOperatingTimeCalc.vue"

export default {
  name: "DetailOperatingTime",
  props: ["store"],
  components: {
    DetailCardBar,
    DetailOperatingTimeUpdate,
    DetailOperatingTimeCalc,
  },
  data() {
    return {
      title: "운영 시간",
      expand: true,
      updateDialog: false,

      dayLabels: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    }
  },
  // mounted() {
  // },
  // watch: {
  //   store() {
  //     this.fetch()
  //   },
  // },
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
  methods: {
    // boldToday(index) {
    //   let nowDay = new Date().getDay()
    //   if (nowDay == 0) {
    //     if (index == 6) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   } else {
    //     if (nowDay === index + 1) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   }
    // },
    boldToday(index) {
      let nowDay = new Date().getDay()
      if (nowDay === index) {
        return true
      } else {
        return false
      }
    },
    stringfyTime(time) {
      let hours = ""
      let minutes = ""
      if (time ?? false) {
        hours = time.slice(0, 2)
        minutes = time.slice(2)
        return hours + ":" + minutes
      } else {
        return "휴무"
      }
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
  },
}
</script>

<style>
.borderRight {
  border-right: 1px solid #eeee;
}
</style>
