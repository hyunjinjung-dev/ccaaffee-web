<template>
  <v-dialog
    v-model="dialog"
    transition="scroll-x-transition"
    @click:outside="closeBtnClicked"
    max-width="500px"
  >
    <v-carousel
      v-model="activeSlide"
      hide-delimiter-background
      show-arrows-on-hover
      :touch="{
        left: () => activeSlide++,
        right: () => activeSlide--,
      }"
      style="border-radius: 4px;"
    >
      <v-carousel-item v-for="(photo, index) in photoList" :key="index" :src="photo.link">
      </v-carousel-item>
    </v-carousel>
  </v-dialog>
</template>

<script>
export default {
  props: ["store", "dialog", "photoList", "selectedPhoto"],
  data() {
    return {
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
