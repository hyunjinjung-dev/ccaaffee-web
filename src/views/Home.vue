<template>
  <div id="home" class="pa-4">
    <v-container fluid>
      <h3 class="headline font-weight-medium">Recommended</h3>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="i in loading ? 10 : 12"
          :key="i"
          class="mx-xs-auto"
        >
          <v-skeleton-loader type="card-avatar" :loading="loading">
            <store-card :card="{ maxWidth: 350 }" :store="store"></store-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import StoreCard from "@/components/StoreCard"

export default {
  name: "Home",
  data: () => ({
    loading: true,
    store: {
      storeId: "",
      storeName: "gongrot",
      branchName: "-",
      isOpen: "영업중",

      url: "/watch/12",
      views: "9.6k",
      createdAt: "6 hours ago",
    },
  }),
  components: {
    StoreCard,
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
}
</script>

<style lang="scss">
.card {
  background: #f9f9f9 !important;
}
</style>
