<template>
  <div>
    <div>
      this is search
    </div>

    <v-btn @click="openFilterDialog">필터</v-btn>
    <v-btn @click="save">save</v-btn>
    <v-btn @click="read">read</v-btn>

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
      this.$firebase
        .database()
        .ref()
        .child("abcd")
        .child("abcd")
        .child("abcd")
        .set({
          title: "abcd",
          text: "tttttt",
        })

      this.filterDialogToggle = true
    },
    closeFilterDialog() {
      this.filterDialogToggle = false
    },
    async save() {
      console.log("save@@@")
      try {
        await this.$firebase
          .database()
          .ref()
          .child("abcd")
          .child("abcd")
          .child("abcd")
          .set({
            title: "abcd",
            text: "tttttt",
          })
      } finally {
        this.dialog = false
      }
    },

    read() {
      this.$firebase
        .database()
        .ref()
        .child("abcd")
        .on("value", (sn) => {
          console.log(sn)
          console.log(sn.val())
        })
    },
  },
}
</script>

<style></style>
