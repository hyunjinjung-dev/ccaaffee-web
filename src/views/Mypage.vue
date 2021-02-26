<template>
  <v-card v-if="fireUser" flat tile>
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

    <v-tabs v-model="tab" icons-and-text :grow="breakPointXs">
      <!-- background-color="deep-purple accent-4" dark -->
      <v-tabs-slider></v-tabs-slider>

      <v-tab>
        <small class="mt-1">Like</small>
        <v-icon small>mdi-heart</v-icon>
      </v-tab>

      <v-tab>
        <small class="mt-1">Bookmark</small>
        <v-icon small>mdi-bookmark</v-icon>
      </v-tab>

      <v-tab>
        <small class="mt-1">Pin</small>
        <v-icon small>mdi-pin</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <!-- To Do : v-if 로 탭을 옮길때마다 destroy를 할 것인지 판단 -->
      <v-tab-item>
        <v-card flat>
          <v-card-text class="pa-1">
            <mypage-tab type="like"></mypage-tab>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="pa-1">
            <mypage-tab type="bookmark"></mypage-tab>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="pa-1">
            33
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import MypageTab from "@/components/Mypage/MypageTab.vue"

export default {
  components: {
    MypageTab,
  },
  data() {
    return {
      tab: null,
    }
  },
  computed: {
    fireUser() {
      return this.$store.state.fireUser
    },
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
}
</script>

<style></style>
