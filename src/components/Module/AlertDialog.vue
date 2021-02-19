<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="">
        {{ emoji }}
      </v-card-title>
      <v-card-subtitle class="">
        {{ title }}
      </v-card-subtitle>
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
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeBtnClicked">
          취소
        </v-btn>
        <v-btn class="primary white--text" text @click="confirmBtnClicked">{{ btnText }}</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // props: ["title", "firstLineText", "secondLineText", "ThirdLineText", "btnText", "dialog"],
  props: {
    emoji: String,
    title: String,
    firstLineText: {
      type: String,
    },
    secondLineText: {
      type: String,
    },
    ThirdLineText: String,
    // btnText: {
    //   type: String,
    // },
    timeout: String,
    dialog: Boolean,
  },
  mounted() {
    this.setTimer()
  },
  methods: {
    setTimer() {
      let seconds = Number(this.timeout)
      setTimeout(() => {}, seconds)
    },
    closeBtnClicked() {
      // this.$emit("closeBtnClicked")
    },
    confirmBtnClicked() {
      // this.$emit("confirmBtnClicked")
    },
  },
}
</script>

<style></style>
