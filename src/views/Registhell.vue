<template>
  <v-stepper v-model="e13" vertical>
    <v-stepper-step step="1">
      카페 이름
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card flat max-width="300">
        <v-card-text>
          <v-text-field
            v-model="form.storeNameKor"
            :rules="storeNameKorRules"
            label="카페명(국문)"
            hint="한글로 입력해주세요🇰🇷"
            outlined
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="e13 = 1">
            이전
          </v-btn>
          <v-btn color="primary" @click="e13 = 2">
            다음
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>

    <v-stepper-step step="2">
      주소
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card flat max-width="300">
        <v-card-text>
          <v-text-field
            v-model="form.address"
            :rules="addressRules"
            label="주소"
            readonly
            outlined
            required
            @click="openAddressDialog"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="e13 = 1">
            이전
          </v-btn>
          <v-btn color="primary" @click="e13 = 3">
            다음
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>

    <v-stepper-step step="3"> 333 </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-card-text>
        hell
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="e13 = 2">
          이전
        </v-btn>
        <v-btn color="primary" @click="nextStep">
          다음
        </v-btn>
      </v-card-actions>
    </v-stepper-content>
    <!-- 
    <v-stepper-step :rules="[() => false]" step="4">
      Ad templates
      <small>Alert message</small>
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="e13 = 4">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content> -->
  </v-stepper>
</template>
<script>
export default {
  data() {
    return {
      e13: 1,

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
        (v) => (v && v.length <= 20) || "카페명(국문)은 20자 이하로 입력 가능합니다",
      ],
      addressRules: [(v) => !!v || "주소를 입력해주세요"],
    }
  },
  methods: {
    openAddressDialog() {
      console.log("open address dialog")
    },
  },
}
</script>

<style></style>
