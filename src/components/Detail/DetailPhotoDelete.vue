<template>
  <v-dialog
    v-model="dialog"
    persistent
    :fullscreen="breakPointXs ? true : false"
    max-width="500"
    transition="scroll-x-transition"
  >
    <v-card class="pa-2">
      <v-card-title class="font-weight-bold subheading mb-5">{{ title }} 삭제</v-card-title>
      <v-card-text>
        <v-file-input v-model="image" label="사진 선택" prepend-icon="mdi-camera" show-size />
        <v-img :src="url" />
        내가 올린 이미지 삭제 버튼 추가 버튼 업로드 용량 제한 유저 기록 등등
      </v-card-text>

      <v-card-actions class="mt-5">
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
      image: null,
      valid: false,
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    url() {
      if (!this.image) {
        return
      }
      return URL.createObjectURL(this.image)
    },
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
  methods: {
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
    fetch() {
      console.log("fetch")
    },
    async updateBtnClicked() {
      if (
        this.store.since === this.form.since &&
        this.store.seatCount === this.form.seatCount &&
        this.store.phoneNumber === this.form.phoneNumber &&
        this.store.instagram === this.form.instagram &&
        this.store.noticeTip === this.form.noticeTip
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
  },
}
</script>

<style></style>
