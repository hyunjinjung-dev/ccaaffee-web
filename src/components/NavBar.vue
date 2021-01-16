<template>
  <nav id="navbar">
    <v-app-bar color="white" flat app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" class="black--text" style="text-decoration: none">
          CCAAFFEE
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon size="25">
          mdi-account-box
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list nav dense>
        <v-list-item-group active-class="red--text text--accent-4">
          <v-list-item v-for="(item, index) in items" :key="index" router link exact>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    items: [
      {
        title: "Home",
        link: "/",
        icon: "mdi-home",
      },
      {
        title: "Search",
        link: "/search",
        icon: "mdi-magnify",
      },
      {
        title: "Map",
        link: "/map",
        icon: "mdi-map-search",
      },
      {
        title: "Community",
        link: "/community",
        icon: "mdi-account-group",
      },
      {
        title: "Mypage",
        link: "/mypage",
        icon: "mdi-account",
      },
    ],
  }),
  methods: {},
}
</script>

<style lang="scss"></style>
