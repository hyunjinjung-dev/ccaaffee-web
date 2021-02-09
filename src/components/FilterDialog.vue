<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="500px"
    transition="scroll-x-transition"
    :fullscreen="breakPointXs ? true : false"
    :hide-overlay="breakPointXs ? true : false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        <span>필터</span>
      </v-btn>
    </template>

    <v-card flat>
      <v-toolbar flat>
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
                    v-for="(tag, index) in offerTags"
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
        <v-btn block large color="primary" @click="applyBtnClicked">
          필터 적용
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex"

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
    }
  },
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
    ...mapState([
      "sortTags",
      "dayOfWeek",
      "distance",
      "parkingTags",
      "offerTags",
      "policyTags",
      "amenityTags",
      "themeTags",
    ]),
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
