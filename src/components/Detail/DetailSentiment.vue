<template>
  <v-card color="primary" dark>
    <v-card-title>
      <v-layout wrap align-center justify-space-between>
        <v-tooltip
          v-for="sentiment in sentiments"
          :key="`sentiment-key-${sentiment.id}`"
          :color="sentiment.color"
          top
        >
          <template v-slot:activator="{ on }">
            <v-flex xs3 style="text-align:center;">
              <v-btn class="pa-0" height="56" plain :ripple="false" v-on="on" text>
                <div class="pa-1">
                  <div class="pb-1">
                    <v-icon>{{ sentiment.icon }}</v-icon>
                  </div>
                  <small style="display: block;" v-if="store.sentiment">
                    {{ store.sentiment[sentiment.id] }}
                  </small>
                </div>
              </v-btn>
            </v-flex>
          </template>
          {{ sentiment.title }}
        </v-tooltip>
      </v-layout>
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
        id: "first",
        icon: "mdi-emoticon-sad-outline",
        title: "별로",
        color: "error",
      },
      {
        id: "second",
        icon: "mdi-emoticon-neutral-outline",
        title: "쏘쏘",
        color: "warning",
      },
      {
        id: "third",
        icon: "mdi-emoticon-happy-outline",
        title: "만족",
        color: "info",
      },
      {
        id: "fourth",
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
