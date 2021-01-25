<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="500px"
    transition="scroll-y-transition"
    :fullscreen="this.$vuetify.breakpoint.xs ? true : false"
    :hide-overlay="this.$vuetify.breakpoint.xs ? true : false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        <span>필터</span>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>필터</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeBtnClicked">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text :class="{ marginZero: breakPointXs, maxHeight: !breakPointXs }">
        <v-list subheader>
          <!-- <v-subheader>User Controls</v-subheader> -->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>정렬</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip-group
                  mandatory
                  v-model="selectedSortTag"
                  active-class="primary primary--text"
                >
                  <v-chip small outlined v-for="(tag, index) in sortTags" :key="index" :value="tag">
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <span class="mr-4">방문 요일/시간</span>
                <v-switch
                  style="display:inline-block;"
                  v-model="visitOptionsSwitch"
                  dense
                ></v-switch>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-expand-transition>
                  <v-card flat v-show="visitOptionsSwitch">
                    <v-chip-group v-model="selectedDayOfWeek" active-class="primary primary--text">
                      <v-chip
                        small
                        outlined
                        v-for="(tag, index) in dayOfWeek"
                        :key="index"
                        :value="tag"
                      >
                        {{ tag }}
                      </v-chip>
                    </v-chip-group>

                    <!-- Menu + TimePicker -->
                    <v-row>
                      <v-col>
                        <v-menu
                          ref="startMenu"
                          v-model="startMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="startTime"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="startTime"
                              label="Start Time"
                              prepend-icon="mdi-clock-time-five-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              color="primary"
                              clearable
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="startMenu"
                            v-model="startTime"
                            full-width
                            ampm-in-title
                            color="primary"
                            @click:minute="$refs.startMenu.save(startTime)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>

                      <v-col>
                        <v-menu
                          ref="endMenu"
                          v-model="endMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="endTime"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="endTime"
                              label="End Time"
                              prepend-icon="mdi-clock-time-nine-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              color="primary"
                              clearable
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="endMenu"
                            v-model="endTime"
                            full-width
                            ampm-in-title
                            color="primary"
                            @click:minute="$refs.endMenu.save(endTime)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-expand-transition>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >거리 <span class="body-2">(기본 500m 적용)</span></v-list-item-title
              >
              <v-list-item-subtitle>
                <v-slider
                  v-model="selectedDistance"
                  :tick-labels="distance"
                  :max="4"
                  step="1"
                  ticks="always"
                  tick-size="1"
                  color="primary"
                  track-fill-color="primary"
                  track-color="grey lighten-2"
                ></v-slider>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>주차</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip-group
                  v-model="selectedParkingTags"
                  multiple
                  column
                  active-class="primary primary--text"
                >
                  <v-chip
                    small
                    outlined
                    v-for="(tag, index) in parkingTags"
                    :key="index"
                    :value="tag"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>제공</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip-group
                  v-model="selectedOfferTags"
                  multiple
                  column
                  active-class="primary primary--text"
                >
                  <v-chip
                    small
                    outlined
                    v-for="(tag, index) in OfferTags"
                    :key="index"
                    :value="tag"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>정책</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip-group
                  v-model="selectedPolicyTags"
                  multiple
                  column
                  active-class="primary primary--text"
                >
                  <v-chip
                    small
                    outlined
                    v-for="(tag, index) in policyTags"
                    :key="index"
                    :value="tag"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>편의</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip-group
                  v-model="selectedAmenityTags"
                  multiple
                  column
                  active-class="primary primary--text"
                >
                  <v-chip
                    small
                    outlined
                    v-for="(tag, index) in amenityTags"
                    :key="index"
                    :value="tag"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>테마</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip-group
                  v-model="selectedThemeTags"
                  multiple
                  column
                  active-class="primary primary--text"
                >
                  <v-chip
                    small
                    outlined
                    v-for="(tag, index) in themeTags"
                    :key="index"
                    :value="tag"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn block large color="secondary" @click="applyBtnClicked">
          필터 적용
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["hell"],
  data() {
    return {
      dialog: false,

      selectedSortTag: null,
      visitOptionsSwitch: false,
      selectedDayOfWeek: null,
      startTime: null,
      endTime: null,
      startMenu: false,
      endMenu: false,
      selectedDistance: null,

      selectedParkingTags: [],
      selectedOfferTags: [],
      selectedPolicyTags: [],
      selectedAmenityTags: [],
      selectedThemeTags: [],
      sortTags: ["거리순", "평점순", "리뷰순", "신규오픈순"],
      dayOfWeek: ["월", "화", "수", "목", "금", "토", "일"],
      distance: ["100m", "300m", "500m", "1km", "3km"],
      parkingTags: ["무료주차가능", "유료주차가능", "주차불가"],
      OfferTags: [
        "커피",
        "디카페인커피",
        "차(茶)",
        "베이커리",
        "디저트",
        "브런치",
        "원두판매",
        "주류판매",
      ],
      policyTags: ["유아동반", "노키즈존", "반려동물동반", "대관", "테이크아웃", "배달"],
      amenityTags: [
        "Wi-Fi",
        "콘센트",
        "높은테이블",
        "단체석",
        "룸",
        "유아의자",
        "화장실 남녀구분",
        "흡연시설",
      ],
      themeTags: [
        "루프탑",
        "북카페",
        "정원",
        "야외좌석",
        "한옥",
        "모던",
        "오픈콘크리트",
        "플라워",
        "식물",
        "갤러리",
        "수영장",
        "오션뷰",
        "리버뷰",
        "마운틴뷰",
        "씨티뷰",
      ],
    }
  },
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
  methods: {
    closeBtnClicked() {
      this.dialog = false
    },
    applyBtnClicked() {
      this.$emit("applyFilter")
      this.dialog = false
    },
  },
}
</script>

<style>
.marginZero {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.maxHeight {
  max-height: 500px;
}
</style>
