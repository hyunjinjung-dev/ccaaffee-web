<template>
  <v-dialog
    v-model="dialog"
    transition="scroll-x-transition"
    @click:outside="closeBtnClicked"
    max-width="500px"
  >
    <!-- <v-card class="pa-2">
      <v-card-title v-if="store" class="font-weight-bold subheading mb-5">
        <span class="font-weight-bold" style="font-size: 1.5rem">
          {{ store.storeNameKor }}
        </span>
        <span style="font-size: 1.25rem">{{ store.branchName }}</span>
      </v-card-title>
      <v-card-text>
        hell
      </v-card-text>

      <v-card-actions class="mt-5">
        <v-spacer></v-spacer>
        <v-btn text @click="closeBtnClicked">닫기</v-btn>
      </v-card-actions>
    </v-card> -->

    <!-- carousel height 이거 고치다 말았다 -->
    <!-- https://stackoverflow.com/questions/51067412/changing-the-vuetify-carousel-height -->
    <!-- <v-card max-width="300px" class="pa-2"> -->
    <v-carousel
      v-model="activeSlide"
      hide-delimiter-background
      show-arrows-on-hover
      :touch="{
        left: () => activeSlide++,
        right: () => activeSlide--,
      }"
      style="border-radius: 5px;"
    >
      <v-carousel-item v-for="(photo, index) in photoList" :key="index" :src="photo.link">
      </v-carousel-item>
    </v-carousel>
    <!-- </v-card> -->

    <!-- <v-row justify="space-around">
      <v-icon @click="model--">
        mdi-minus
      </v-icon>
      {{ model }}
      <v-icon @click="model++">
        mdi-plus
      </v-icon>
    </v-row>
    <v-carousel v-model="model">
      <v-carousel-item v-for="(color, i) in colors" :key="color">
        <v-sheet :color="color" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">Slide {{ i + 1 }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel> -->
  </v-dialog>
</template>

<script>
export default {
  props: ["store", "dialog", "photoList", "selectedPhoto"],
  data() {
    return {
      // colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      activeSlide: 0,
    }
  },
  mounted() {
    this.setSelectedPhoto()
  },
  methods: {
    setSelectedPhoto() {
      this.activeSlide = this.selectedPhoto
    },
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
  },
}
</script>

<style></style>
