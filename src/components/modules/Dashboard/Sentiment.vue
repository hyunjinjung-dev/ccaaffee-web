<template>
  <v-sheet color="primary" dark tag="section">
    <v-card-title>
      <v-layout align-center justify-space-between>
        <v-flex class="font-weight-medium py-0 subheading">How are you feeling?</v-flex>
        <v-flex class="py-0" shrink>
          <v-btn-toggle class="transparent" v-model="sentiment">
            <v-tooltip
              v-for="sentiment in sentiments"
              :key="`sentiment-key-${sentiment.id}`"
              :color="sentiment.color"
              top
            >
              <template v-slot:activator="{ on }">
                <v-btn flat icon :ripple="false" v-on="on">
                  <v-icon>{{ sentiment.icon }}</v-icon>
                </v-btn>
              </template>
              {{ sentiment.title }}
            </v-tooltip>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text v-if="isManager" class="warning lighten-1">
      <v-layout align-center justify-space-between>
        <v-flex class="font-weight-normal py-0">Your team is feeling...</v-flex>
        <v-flex class="px-3" shrink>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">sentiment_dissatisfied</v-icon>
            </template>
            <span>Ok</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-sheet>
</template>

<script>
export default {
  name: "DashboardSentiment",
  data: () => ({
    sentiment: null,
    sentiments: [
      {
        id: 1,
        icon: "sentiment_very_dissatisfied",
        title: "Unhappy",
        color: "error",
      },
      {
        id: 2,
        icon: "sentiment_dissatisfied",
        title: "Ok",
        color: "warning",
      },
      {
        id: 3,
        icon: "sentiment_satisfied",
        title: "Happy",
        color: "info",
      },
      {
        id: 4,
        icon: "sentiment_very_satisfied",
        title: "Ecstatic",
        color: "success",
      },
    ],
  }),
  computed: {
    isManager() {
      return this.$store.state.isManager
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
</style>
