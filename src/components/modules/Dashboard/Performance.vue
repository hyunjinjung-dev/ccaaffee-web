<template>
  <v-card tag="section">
    <v-card-title>
      <v-layout align-center justify-space-between>
        <v-flex class="font-weight-medium subheading">Your objectives</v-flex>
        <v-flex class="py-0" shrink>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn class="ma-0" icon v-on="on">
                <v-icon color="primary" dark>add_circle</v-icon>
              </v-btn>
            </template>
            <span>Add an objective</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list three-line>
        <v-list-tile
          v-for="objective in getObjectives"
          :key="`objective-key-${objective.id}`"
          avatar
        >
          <v-list-tile-avatar>
            <v-avatar color="info" size="40px">
              <v-icon color="white">{{ objective.icon }}</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ objective.title }}</v-list-tile-title>
            <v-list-tile-sub-title :class="{ 'error--text': objective.overdue }">{{
              objective.when
            }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>
              <v-progress-linear
                class="my-2"
                :color="GetObjectiveProgressColour(objective.completeness)"
                height="4"
                :value="objective.completeness"
              ></v-progress-linear>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DashboardPerformance",

  computed: {
    getObjectives() {
      return this.$store.getters["objectives/getObjectives"]
    },
  },

  methods: {
    GetObjectiveProgressColour(currentProgress) {
      if (!currentProgress) {
        return
      }
      switch (true) {
        case currentProgress < 25:
          return "error"
        case currentProgress >= 25 && currentProgress < 50:
          return "warning"
        case currentProgress >= 50 && currentProgress < 75:
          return "info"
        default:
          return "success"
      }
    },
  },
}
</script>
