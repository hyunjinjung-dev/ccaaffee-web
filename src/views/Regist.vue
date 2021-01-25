<template>
  <v-sheet :class="this.$vuetify.breakpoint.xs ? 'mt-5' : 'ma-5'">
    <v-alert border="left" color="primary" dark class="mb-2">
      * 표시가 되어있는 항목은 필수로 입력해주세요
    </v-alert>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          카페명 / 지점명
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          주소 / 층
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="3">
          추가 정보 입력
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1" :class="this.$vuetify.breakpoint.xs ? 'pa-0' : ''">
          <v-card flat>
            <v-card-text>
              <v-form ref="form1" v-model="valid1">
                <v-text-field
                  v-model="form.storeNameKor"
                  :rules="storeNameKorRules"
                  label="카페명(국문) *"
                  hint="한글로 입력해주세요🇰🇷"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.storeNameEng"
                  :rules="storeNameEngRules"
                  hint="영어로 입력해주세요🔤"
                  outlined
                  label="카페명(영문)"
                ></v-text-field>
                <v-text-field
                  v-model="form.branchName"
                  :rules="branchNameRules"
                  label="지점명"
                  hint="본점이거나 알 수 없을 경우 비워주세요"
                  outlined
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn text @click="e13 = 1">이전</v-btn> -->
              <v-btn color="primary" :disabled="!valid1" @click="nextStep(1)">다음</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2" :class="this.$vuetify.breakpoint.xs ? 'pa-0' : ''">
          <v-card flat>
            <v-form ref="form2" v-model="valid2">
              <v-card-text>
                <v-text-field
                  v-model="form.address"
                  :rules="addressRules"
                  label="주소 *"
                  readonly
                  outlined
                  required
                  @click="openAddressDialog"
                ></v-text-field>
                <v-container class=" pa-0 floorContainer">
                  <v-row>
                    <v-col>
                      <v-text-field
                        class="floor"
                        v-model="form.lowFloor"
                        :rules="lowFloorRules"
                        hint="한 층인 경우 최고층과 동일하게 입력해주세요."
                        label="최저층 *"
                        outlined
                        required
                        type="number"
                      >
                        <v-icon slot="prepend-inner" color="green" @click="form.lowFloor--">
                          mdi-minus
                        </v-icon>
                        <v-icon slot="append" color="red" @click="form.lowFloor++">
                          mdi-plus
                        </v-icon>
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        class="floor"
                        v-model="form.highFloor"
                        :rules="highFloorRules"
                        hint="한 층인 경우, 최저층과 동일하게 입력해주세요."
                        label="최고층 *"
                        outlined
                        required
                      >
                        <v-icon slot="prepend-inner" color="green" @click="form.highFloor--">
                          mdi-minus
                        </v-icon>
                        <v-icon slot="append" color="red" @click="form.highFloor++">
                          mdi-plus
                        </v-icon>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="nextStep(0)">이전</v-btn>
              <v-btn color="primary" :disabled="!valid2" @click="nextStep(2)">다음</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3" :class="this.$vuetify.breakpoint.xs ? 'pa-0' : ''">
          <v-card flat>
            <v-form ref="form3" v-model="valid3">
              <v-card-text>
                <v-text-field
                  v-model="form.phoneNumber"
                  :rules="phoneNumberRules"
                  hint="하이픈(-)은 제외하고 입력해주세요"
                  type="tel"
                  label="전화번호"
                  outlined
                ></v-text-field>
                <div>{{ form.phoneNumber }}</div>
                <v-text-field
                  v-model="form.instagram"
                  :rules="instagramRules"
                  hint="At(@)은 제외하고 입력해주세요"
                  label="인스타그램"
                  outlined
                ></v-text-field>
              </v-card-text>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="nextStep(1)">이전</v-btn>
              <v-btn color="primary" :disabled="!valid3" @click="registBtnClicked">등록</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <!-- 다음 카카오 주소 Dialog -->
    <v-dialog max-height="500px" max-width="500px" v-model="addressDialogToggle">
      <v-card>
        <vue-daum-postcode
          style="height: 500px; overflow: scroll;"
          @complete="addressSelected($event.roadAddress)"
        />
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import { VueDaumPostcode } from "vue-daum-postcode"
import axios from "axios"

export default {
  components: {
    VueDaumPostcode,
  },
  data() {
    return {
      valid1: false,
      valid2: false,
      valid3: false,

      addressDialogToggle: false,
      e1: 1,
      steps: 3,

      form: {
        storeNameKor: "",
        address: "",
        lowFloor: 1,
        highFloor: 1,
        storeNameEng: "",
        branchName: "",
        phoneNumber: "",
        instagram: "",
        operatingTimeInfo: false,
        lat: 0,
        lng: 0,
        commentCount: 0,
        viewCount: 0,
        reviewCount: 0,
        rating: 0,
        seatCount: 0,
        likeUserCount: 0,
        likeUserList: [],
      },
      storeNameKorRules: [
        (v) => !!v || "카페명을 입력해주세요",
        (v) => (v && v.length <= 20) || "카페명(국문)은 20자 이하로 입력 가능해요",
      ],
      storeNameEngRules: [(v) => v.length <= 20 || "카페명(영문)은 20자 이하로 입력 가능해요"],
      branchNameRules: [(v) => v.length <= 10 || "지점명은 10자 이하로 입력 가능합니다"],
      addressRules: [(v) => !!v || "주소를 입력해주세요"],
      lowFloorRules: [
        (v) => !!v || !!(v != 0) || "최저층을 입력해주세요",
        (v) => (v && v != 0 && v <= this.form.highFloor) || "최고층보다 낮거나 같아야해요",
      ],
      highFloorRules: [
        (v) => !!v || !!(v != 0) || "최고층을 입력해주세요",
        (v) => (v && v != 0 && v >= this.form.lowFloor) || "최저층보다 높거나 같아야해요",
      ],
      phoneNumberRules: [(v) => v.length <= 13 || "입력하신 전화번호를 확인해주세요"],
      instagramRules: [(v) => v.length <= 20 || "인스타그램 아이디는 20자 이하로 입력 가능해요"],
    }
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
    },

    openAddressDialog() {
      this.addressDialogToggle = true
    },
    addressSelected(selectedAddress) {
      this.form.address = selectedAddress
      this.addressDialogToggle = false
    },

    async registBtnClicked() {
      // await this.$refs.form.validate()
      await this.removeHyphen()
      await this.getLatLng()

      if (this.form.lat && this.form.lng) {
        this.registStore()
      } else {
        this.$toast.error("입력하신 주소를 확인해주세요")
      }
    },
    removeHyphen() {
      this.form.phoneNumber = this.form.phoneNumber.replace(/-/g, "")
    },
    async getLatLng() {
      // To Do
      // JavaSciprt Key : e9b8744f142d87e82a9a840a32aa395b
      // REST API Key : 8aec30f44a150144c4bcac2194e4d9f7

      let restAPIKey = "8aec30f44a150144c4bcac2194e4d9f7" // REST API key
      let queryString = this.form.address

      let URL = "https://dapi.kakao.com/v2/local/search/address.json?query=" + queryString
      axios.defaults.withCredentials = false
      axios.defaults.headers.common["Authorization"] = "KakaoAK " + restAPIKey
      axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
      await axios
        .get(URL)
        .then((res) => {
          this.form.lat = res.data.documents[0].y
          this.form.lng = res.data.documents[0].x
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async registStore() {
      let ref = this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")

      try {
        const createdAt = new Date()
        const id = createdAt.getTime().toString()
        this.form.createdAt = createdAt
        this.form.uid = this.$store.state.fireUser.uid // 등록 유저 저장
        this.form.user = this.$store.state.fireUser.email

        await ref
          .collection("cafe")
          .doc(id)
          .set(this.form)
        // To Do
        // Function으로 count increment 필요

        // const batch = await this.$firebase.firestore().batch()
        // batch.set(ref.collection("cafe").doc(id), this.form)
        // batch.update(ref, { count: this.$firebase.firestore.FieldValue.increment(1) })
        // await batch.commit()
      } finally {
        // To Do
        // 등록된 카페 디테일 페이지로 router 이동 필요
      }
    },
  },
}
</script>

<style lang="scss">
.floor {
  .v-input__control {
    .v-input__slot {
      .v-text-field__slot {
        input {
          text-align: center;
        }
      }
    }
  }
}
</style>
