<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <div v-if="firstLineText">
          {{ firstLineText }}
        </div>
        <div v-if="secondLineText">
          {{ secondLineText }}
        </div>
        <div v-if="ThirdLineText">
          {{ ThirdLineText }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeBtnClicked">
          취소
        </v-btn>
        <v-btn class="primary white--text" text @click="confirmBtnClicked">{{ btnText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // props: ["title", "firstLineText", "secondLineText", "ThirdLineText", "btnText", "dialog"],
  props: {
    title: String,
    firstLineText: {
      type: String,
      default: "완전히 삭제할까요?",
    },
    secondLineText: {
      type: String,
      default: "(삭제를 누르시면 되돌릴 수 없어요!)",
    },
    ThirdLineText: String,
    btnText: {
      type: String,
      default: "삭제",
    },
    dialog: Boolean,
  },
  methods: {
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
    confirmBtnClicked() {
      this.$emit("confirmBtnClicked")
    },
  },
}
</script>

<style></style>
