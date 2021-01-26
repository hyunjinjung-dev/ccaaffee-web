<template>
  <v-card tag="section">
    <v-card-title>
      <v-layout align-center justify-space-between>
        <v-flex class="font-weight-bold subheading">What needs doing?</v-flex>
        <v-flex class="py-0" shrink>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn class="ma-0" icon v-on="on">
                <v-icon color="primary" dark>mdi-plus-circle</v-icon>
              </v-btn>
            </template>
            <span>Add a task</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line>
        <v-list-tile v-for="todo in todoList" :key="`todo-key-${todo.id}`" avatar>
          <v-list-tile-avatar>
            <v-avatar color="primary" size="40px">
              <v-icon color="white">{{ todo.icon }}</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ todo.title }}</v-list-tile-title>
            <v-list-tile-sub-title class="error--text">{{ todo.when }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DashboardWhatNeedsDoing",

  data: () => ({}),

  computed: {
    todoList() {
      return this.$store.getters["todos/getTodosOverdue"]
    },
  },
}
</script>
