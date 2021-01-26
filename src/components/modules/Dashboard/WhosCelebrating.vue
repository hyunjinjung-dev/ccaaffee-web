<template>
  <v-card tag="section">
    <v-card-title>
      <v-layout align-center justify-space-between>
        <v-flex class="font-weight-medium py-0 subheading">Who's celebrating this week?</v-flex>
        <v-flex class="py-0" shrink>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn class="ma-0" icon v-on="on">
                <v-icon color="primary" dark>add_circle</v-icon>
              </v-btn>
            </template>
            <span>Give recognition</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list class="pa-0" dense two-line>
        <v-list-tile
          v-for="person in getPeopleCelebrating"
          :key="`person-celebrating-${person.id}`"
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
          <v-list-tile-action>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-icon :color="GetCelebrationColor(person.id)" v-on="on">{{
                  GetCelebrationIcon(person.id)
                }}</v-icon>
              </template>
              <span>{{ GetCelebrationTitle(person.id) }}</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DashboardWhosCelebrating",

  data: () => ({
    celebrations: [
      {
        id: 1,
        icon: "cake",
        color: "secondary",
        personId: 5,
        title: "Birthday",
      },
      {
        id: 2,
        icon: "person_add",
        color: "info",
        personId: 8,
        title: "New starter",
      },
      {
        id: 3,
        icon: "today",
        color: "success",
        personId: 10,
        title: "Anniversary",
      },
    ],
    peopleCelebrating: [5, 8, 10],
  }),

  computed: {
    getPeopleCelebrating() {
      return this.$store.getters["people/getPeopleByIds"](this.peopleCelebrating)
    },
  },

  methods: {
    GetCelebrationColor(personId) {
      return this.celebrations.find((item) => item.personId === personId).color || ""
    },
    GetCelebrationIcon(personId) {
      return this.celebrations.find((item) => item.personId === personId).icon || ""
    },
    GetCelebrationTitle(personId) {
      return this.celebrations.find((item) => item.personId === personId).title || ""
    },
  },
}
</script>

<style scoped>
.v-list__tile__content ~ .v-list__tile__action:not(.v-list__tile__action--stack) {
  justify-content: center;
  min-width: 36px;
}
</style>
