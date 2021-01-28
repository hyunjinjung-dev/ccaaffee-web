<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="350" transition="scroll-x-transition">
    <v-card class="pa-2">
      <v-card-title class="font-weight-bold subheading mb-5">{{ title }} 수정</v-card-title>
      <v-card-text style="max-height: 80vh">
        <small>Tip. 운영 시간을 4자리 숫자로 입력해주세요</small>
        <br />
        <small> ex) 09시 00분 ~ 25시 30분 영업 = 0900, 2530</small>
        <v-container class="ma-0 pa-0">
          <v-row class="mx-1">
            <v-text-field v-model="formTip" label="운영 시간 Tip"></v-text-field>
          </v-row>
          <v-divider class="mx-auto my-5" style="width: 20%"></v-divider>

          <v-row no-gutters v-for="(item, index) in form" :key="index">
            <v-col cols="1">
              <v-checkbox dense color="primary" v-model="form[index].open"></v-checkbox>
            </v-col>
            <v-col cols="1"></v-col>
            <v-col cols="4">
              <v-text-field
                dense
                v-model="form[index].openTime"
                type="tel"
                :disabled="!form[index].open"
                :label="dayLabels[index] + ' Open'"
                color="grey"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="1"></v-col>
            <v-col cols="4">
              <v-text-field
                dense
                v-model="form[index].closeTime"
                type="tel"
                :disabled="!form[index].open"
                :label="dayLabels[index] + ' Close'"
                color="grey"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="closeBtnClicked">취소</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateBtnClicked">수정</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["title", "store", "dialog"],
  data() {
    return {
      dayLabels: ["일", "월", "화", "수", "목", "금", "토"],
      formTip: "",
      form: [
        { open: false },
        { open: false },
        { open: false },
        { open: false },
        { open: false },
        { open: false },
        { open: false },
        // , openTime: "", closeTime: ""
      ],
      // closeTimeRules: [(v) => v > this.form[index].openTime || "안돼"],
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
    fetch() {
      if (this.store.operatingTimeInfo) {
        this.form = JSON.parse(JSON.stringify(this.operatingTime))
      }
    },

    async updateBtnClicked() {
      let valid = await this.validateTime()
      if (valid) {
        console.log("오케이")
      } else {
        console.log("안돼")
      }

      if (
        this.store.phoneNumber === this.form.phoneNumber &&
        this.store.instagram === this.form.instagram &&
        this.store.seatCount === this.form.seatCount
      ) {
        this.$toast.error("변경된 내용이 없습니다.")
        return
      }
    },
    validateTime() {
      for (let i = 0; i < 7; i++) {
        let alertDay = this.dayLabels[i]
        if (this.form[i].openTime) {
          console.log("1", this.form[i].openTime.length)
          console.log("1", this.form[i].closeTime.length)
          if (this.form[i].openTime.length < 0 || this.form[i].closeTime.length > 4) {
            this.$toast.error(alertDay + "요일 영업 시간을 확인해주세요!")
            return false
          }
          if (!(this.form[i].openTime && this.form[i].closeTime)) {
            this.$toast.error(alertDay + "요일 영업 시간을 확인해주세요")
            return false
          }
          if (this.form[i].openTime > this.form[i].closeTime) {
            this.$toast.error(alertDay + "요일 영업시작 시간이 영업종료 시간보다 빨라야해요")
            return false
          }
        }
        return true
      }
    },

    async update() {
      let ref = this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
      try {
        await ref
          .collection("cafe")
          .doc(this.store.storeId)
          .update(this.form)
      } finally {
        this.closeBtnClicked()
      }
    },
  },
}
</script>

<style scoped>
.v-input--checkbox {
  margin: 0 !important;
}
</style>
