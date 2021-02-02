<template>
  <v-card color="primary" dark>
    <v-card-title>
      <!-- <v-layout align-center justify-space-between wrap>
          <v-flex xs12 shrink style="text-align:center;"> -->
      <!-- <v-btn-toggle
              class="transparent"
              v-model="selectedSentiment"
              borderless
              tile
              active-class="active-sentiment"
            > -->
      <v-layout wrap align-center justify-space-between>
        <v-tooltip
          v-for="sentiment in sentiments"
          :key="`sentiment-key-${sentiment.id}`"
          :color="sentiment.color"
          top
        >
          <template v-slot:activator="{ on }">
            <v-flex xs3 style="text-align:center;">
              <v-btn
                class="pa-0"
                height="56"
                plain
                :ripple="false"
                v-on="on"
                text
                @click="sentimentSelected(sentiment.id)"
              >
                <div class="pa-1">
                  <div class="pb-1">
                    <v-icon>{{ sentiment.icon }}</v-icon>
                  </div>
                  <small style="display: block;" v-if="store.sentiment">
                    {{ store.sentiment[sentiment.id - 1] }}
                  </small>
                </div>
              </v-btn>
            </v-flex>
          </template>
          {{ sentiment.title }}
        </v-tooltip>
      </v-layout>

      <!-- </v-btn-toggle> -->
      <!-- </v-flex>
        </v-layout> -->
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "DetailSentiment",
  props: ["store"],
  data: () => ({
    selectedSentiment: null,
    sentiments: [
      {
        id: 1,
        icon: "mdi-emoticon-sad-outline",
        title: "별로",
        color: "error",
      },
      {
        id: 2,
        icon: "mdi-emoticon-neutral-outline",
        title: "쏘쏘",
        color: "warning",
      },
      {
        id: 3,
        icon: "mdi-emoticon-happy-outline",
        title: "만족",
        color: "info",
      },
      {
        id: 4,
        icon: "mdi-emoticon-kiss-outline",
        title: "추천",
        color: "success",
      },
    ],
  }),
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
  methods: {
    sentimentSelected(rate) {
      this.$emit("sentimentSelected", rate)
    },
  },
}
</script>

<style scoped>
.v-btn-toggle .v-btn.v-btn--icon {
  width: 37px;
}
.v-btn-toggle--selected {
  box-shadow: none;
}
.active-sentiment {
  background-color: #e57373;
}
</style>
