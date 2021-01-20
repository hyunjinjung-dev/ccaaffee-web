<template>
  <v-menu offset-y left>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-avatar size="36">
          <img :src="fireUser.photoURL" />
        </v-avatar>
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar size="36">
            <img :src="fireUser.photoURL" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ fireUser.displayName }}</v-list-item-title>
            <v-list-item-subtitle>{{ fireUser.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <!-- <v-list-item router to="/channels/10">
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Your channel</v-list-item-title>
        </v-list-item>
        <v-list-item router to="/studio">
          <v-list-item-icon>
            <v-icon>mdi-youtube-studio</v-icon>
          </v-list-item-icon>
          <v-list-item-title>ccaaffee Studio</v-list-item-title>
        </v-list-item> -->
        <v-list-item @click="signOut">
          <v-list-item-icon>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>로그아웃</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from "vuex"

export default {
  methods: {
    signOut() {
      this.$firebase.auth().signOut()
    },
  },
  computed: {
    ...mapState(["fireUser"]),
  },
}
</script>

<style></style>
