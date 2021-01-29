<template>
  <v-card tag="section" flat>
    <v-card-title>
      <v-flex class="font-weight-bold subheading" :shrink="sizeXS ? true : false">
        {{ title }}
      </v-flex>
      <v-flex class="py-0" shrink>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn class="ma-0" icon v-on="on" @click="editBtnClicked">
              <v-icon color="primary" dark>mdi-pencil-circle</v-icon>
            </v-btn>
          </template>
          <span>{{ title }} 수정</span>
        </v-tooltip>
      </v-flex>
      <v-flex v-if="sizeXS">
        <!-- 중간 정렬용 v-flex -->
      </v-flex>
      <v-flex v-if="sizeXS" shrink>
        <v-btn icon @click="expandToggle">
          <v-icon>{{ expand ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-flex>
    </v-card-title>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "DetailCardBar",
  props: ["title", "store"],
  data() {
    return {
      expand: true,
    }
  },
  computed: {
    sizeXS() {
      return this.$vuetify.breakpoint.xs
    },
  },
  methods: {
    expandToggle() {
      this.$emit("expandToggle")
    },
    editBtnClicked() {
      this.$emit("updateBtnClicked")
    },
  },
}
</script>

<style></style>
