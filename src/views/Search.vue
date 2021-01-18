<template>
  <div>
    <div>
      this is search
    </div>

    <v-btn @click="openFilterDialog">필터</v-btn>

    <!-- 필터 -->
    <v-dialog
      v-if="filterDialogToggle"
      v-model="filterDialogToggle"
      max-width="600px"
      scrollable
      transition="dialog-bottom-transition"
      :fullscreen="this.$vuetify.breakpoint.xs ? true : false"
      :hide-overlay="this.$vuetify.breakpoint.xs ? true : false"
    >
      <filter-dialog @closeDialog="closeFilterDialog"></filter-dialog>
    </v-dialog>
  </div>
</template>

<script>
import FilterDialog from "@/components/FilterDialog.vue"

export default {
  data() {
    return {
      filterDialogToggle: false,
    }
  },
  components: {
    FilterDialog,
  },
  methods: {
    openFilterDialog() {
      this.filterDialogToggle = true
    },
    closeFilterDialog() {
      this.filterDialogToggle = false
    },
  },
}
</script>

<style></style>
