<template>
  <v-dialog
    v-model="dialog"
    persistent
    transition="scroll-x-transition"
    scrollable
    max-width="500px"
    :fullscreen="breakPointXs ? true : false"
    :hide-overlay="breakPointXs ? true : false"
  >
    <v-card class="pa-2">
      <v-card-title class="font-weight-bold subheading mb-5">{{ title }} 수정</v-card-title>
      <v-card-text :class="{ marginZero: breakPointXs, maxHeight: !breakPointXs }">
        <v-list subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>
                <v-text-field
                  v-model="parkingTip"
                  label="주차 팁"
                  hint="ex) 도보 15분 거리, 연남1 노상 공영 주차장 이용 가능"
                ></v-text-field>
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
      <v-card-actions class="mt-5">
        <v-btn text @click="closeBtnClicked">취소</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateBtnClicked">수정</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex"

export default {
  props: ["title", "store", "dialog"],
  data() {
    return {
      selectedParkingTags: [],
      selectedOfferTags: [],
      selectedPolicyTags: [],
      selectedAmenityTags: [],
      selectedThemeTags: [],
      parkingTip: "",
    }
  },
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
    ...mapState(["parkingTags", "offerTags", "policyTags", "amenityTags", "themeTags"]),
  },
  mounted() {
    this.fetch()
  },
  methods: {
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
    fetch() {
      if (this.store.selectedParkingTags) {
        this.selectedParkingTags = this.store.selectedParkingTags
      }
      if (this.store.selectedOfferTags) {
        this.selectedOfferTags = this.store.selectedOfferTags
      }
      if (this.store.selectedPolicyTags) {
        this.selectedPolicyTags = this.store.selectedPolicyTags
      }
      if (this.store.selectedAmenityTags) {
        this.selectedAmenityTags = this.store.selectedAmenityTags
      }
      if (this.store.selectedThemeTags) {
        this.selectedThemeTags = this.store.selectedThemeTags
      }
      if (this.store.parkingTip) {
        this.parkingTip = this.store.parkingTip
      }
    },
    async updateBtnClicked() {
      let updateForm = await this.mapping()
      let ref = this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
      try {
        console.log(this.parkingTip)
        await ref
          .collection("cafe")
          .doc(this.store.storeId)
          .update({ options: updateForm, parkingTip: this.parkingTip })
      } finally {
        this.closeBtnClicked()
      }
    },
    mapping() {
      let updateForm = {}
      this.selectedParkingTags.forEach((e) => {
        updateForm[e] = true
      })
      this.selectedOfferTags.forEach((e) => {
        updateForm[e] = true
      })
      this.selectedPolicyTags.forEach((e) => {
        updateForm[e] = true
      })
      this.selectedAmenityTags.forEach((e) => {
        updateForm[e] = true
      })
      this.selectedThemeTags.forEach((e) => {
        updateForm[e] = true
      })
      return updateForm

      // 도보 15분 거리, 연남1 노상 공영 주차장 이용 가능
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
