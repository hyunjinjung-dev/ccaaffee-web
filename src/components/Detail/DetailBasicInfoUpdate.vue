<template>
  <v-dialog v-model="dialog" persistent max-width="350" transition="scroll-x-transition">
    <v-card class="pa-2">
      <v-card-title class="font-weight-bold subheading mb-5">{{ title }} 수정</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container class="ma-0 pa-0">
            <v-text-field
              v-model="form.phoneNumber"
              :rules="phoneNumberRules"
              type="tel"
              hint="하이픈(-)은 제외하고 입력해주세요"
              label="전화번호"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="form.instagram"
              :rules="instagramRules"
              hint="At(@)은 제외하고 입력해주세요"
              label="인스타그램 아이디"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="form.seatCount"
              :rules="seatCountRules"
              type="number"
              hint="평상시 좌석 수를 입력해주세요"
              label="좌석 수"
              outlined
            ></v-text-field>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="closeBtnClicked">취소</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateBtnClicked" :disabled="!valid">수정</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["title", "store", "dialog"],
  data() {
    return {
      form: {
        phoneNumber: "",
        instagram: "",
        seatCount: null,
      },
      valid: false,
      phoneNumberRules: [(v) => v.length <= 11 || "입력하신 전화번호를 확인해주세요"],
      instagramRules: [(v) => v.length <= 20 || "인스타그램 아이디는 20자 이하로 입력 가능합니다"],
      seatCountRules: [(v) => v >= 0 || "좌석 수를 확인해주세요"],
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
      if (this.store.phoneNumber) {
        this.form.phoneNumber = this.store.phoneNumber
      }
      if (this.store.instagram) {
        this.form.instagram = this.store.instagram
      }
      if (this.store.seatCount) {
        this.form.seatCount = this.store.seatCount
      }
    },
    async updateBtnClicked() {
      await this.removeHyphen()
      await this.removeAt()

      if (
        this.store.phoneNumber === this.form.phoneNumber &&
        this.store.instagram === this.form.instagram &&
        this.store.seatCount === this.form.seatCount
      ) {
        this.$toast.error("변경된 내용이 없습니다.")
        return
      }

      if (this.valid) {
        this.update()
      } else {
        this.$toast.error("입력한 내용을 확인해주세요")
      }
    },
    removeHyphen() {
      this.form.phoneNumber = this.form.phoneNumber.replace(/-/g, "")
    },
    removeAt() {
      this.form.instagram = this.form.instagram.replace("@", "")
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

<style></style>
