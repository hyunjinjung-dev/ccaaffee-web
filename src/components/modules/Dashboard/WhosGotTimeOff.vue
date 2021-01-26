<template>
  <v-card tag="section">
    <v-card-title>
      <v-layout align-center justify-space-between>
        <v-flex class="font-weight-medium py-0 subheading">Who's got time off?</v-flex>
        <v-flex class="py-0" shrink>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn class="ma-0" icon v-on="on">
                <v-icon color="primary" dark>add_circle</v-icon>
              </v-btn>
            </template>
            <span>Request time off</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-subheader>Today</v-subheader>
      <v-list class="pa-0" dense two-line>
        <v-list-tile
          v-for="person in getPeopleOutToday"
          :key="`person-out-today=${person.id}`"
          avatar
        >
          <v-list-tile-avatar>
            <v-avatar size="40px">
              <img :alt="person.fullName" :src="person.avatarUrl" />
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ person.fullName }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ person.role }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-subheader>Tomorrow</v-subheader>
      <v-list class="pa-0" dense two-line>
        <v-list-tile
          v-for="person in getPeopleOutTomorrow"
          :key="`person-out-tomorrow=${person.id}`"
          avatar
        >
          <v-list-tile-avatar>
            <v-avatar size="40px">
              <img :alt="person.fullName" :src="person.avatarUrl" />
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ person.fullName }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ person.role }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-subheader>Rest of the week</v-subheader>
      <avatar-group
        v-if="getPeopleOutWeek && getPeopleOutWeek.length > 0"
        :people="getPeopleOutWeek"
      ></avatar-group>
      <v-list v-else class="pa-0" dense>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text lighten-2">No one else is off</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import AvatarGroup from "../../common/AvatarGroup"

export default {
  name: "DashboardWhosOut",

  components: {
    AvatarGroup,
  },

  data: () => ({
    peopleOutToday: [7, 9],
    peopleOutTomorrow: [5],
    peopleOutWeek: [1, 2, 3, 10],
  }),

  computed: {
    getPeopleOutToday() {
      return this.$store.getters["people/getPeopleByIds"](this.peopleOutToday)
    },
    getPeopleOutTomorrow() {
      return this.$store.getters["people/getPeopleByIds"](this.peopleOutTomorrow)
    },
    getPeopleOutWeek() {
      return this.$store.getters["people/getPeopleByIds"](this.peopleOutWeek)
    },
  },
}
</script>
