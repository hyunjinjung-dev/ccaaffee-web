<template>
  <!-- <v-card class="content-bg card mx-auto pa-2" :max-width="card.maxWidth"> -->
  <v-card class="card mx-auto pa-2" :max-width="card.maxWidth">
    <v-carousel
      :continuous="true"
      :show-arrows="true"
      hide-delimiters
      hide-delimiter-background
      show-arrows-on-hover
      height="200px"
    >
      <!-- <template v-slot:prev="{ on, attrs }">ㅊ
        <v-btn color="white" v-bind="attrs" v-on="on" icon small>
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:next="{ on, attrs }">
        <v-btn color="white" v-bind="attrs" v-on="on" icon small>
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
      </template> -->

      <v-carousel-item v-for="(slide, i) in slides" :key="i" @click="goToDetail(store.storeId)">
        <v-sheet :color="colors[i]" height="200px" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <!-- <v-img :src="store.thumb" height="200px"></v-img> -->

    <v-row no-gutters>
      <v-col cols="10" @click="goToDetail(store.storeId)">
        <v-card-title class="pt-3 pl-2 subtitle-1 font-weight-bold">
          {{ store.storeNameKor }}
          {{ store.branchName }}
        </v-card-title>

        <v-card-subtitle class="pl-2 pb-0">
          Open
          <v-icon>mdi-circle-small</v-icon>
          <v-icon x-small>mdi-eye</v-icon>
          2.3k

          <v-icon>mdi-circle-small</v-icon>
          <v-icon x-small>mdi-heart</v-icon>
          320
        </v-card-subtitle>
      </v-col>
      <v-col cols="2" class="pl-0 pt-3">
        <v-btn fab small depressed :color="liked ? 'primary' : ''" @click="heartBtnClicked">
          <v-icon color="white">mdi-heart</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    store: {
      type: Object,
      required: true,
    },
    card: Object,
  },
  data() {
    return {
      liked: false,
      colors: ["green", "secondary", "yellow darken-4", "red lighten-2", "orange darken-1"],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    }
  },
  methods: {
    heartBtnClicked() {
      this.liked = !this.liked
    },
    goToDetail(storeId) {
      this.$router.push({ name: "Detail", params: { storeId: storeId } })
    },
  },
  computed: {
    // liked() {
    //   return false
    // },
  },
}
</script>

<style></style>
