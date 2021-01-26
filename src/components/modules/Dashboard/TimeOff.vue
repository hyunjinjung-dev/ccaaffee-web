<template>
  <v-card tag="section">
    <v-card-title>
      <v-layout align-center justify-space-between>
        <v-flex class="font-weight-bold subheading" shrink>Time off</v-flex>
        <v-flex>
          <progress-stacked class="mx-5" :collection="progressCollection"></progress-stacked>
        </v-flex>
        <v-flex class="py-0" shrink>
          <v-btn class="ma-0" color="primary">
            <v-icon dark left>mdi-plus</v-icon>
            <span>Request time off</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script>
import ProgressStacked from "@/components/common/ProgressStacked.vue"

export default {
  name: "DashboardTimeOff",
  components: {
    ProgressStacked,
  },
  data: () => ({
    progressCollection: [
      {
        id: 1,
        title: "Approved",
        color: "info",
        value: 6,
      },
      {
        id: 2,
        title: "Pending",
        color: "warning",
        value: 3,
      },
      {
        id: 3,
        title: "Remaining",
        color: "success",
        value: 14,
      },
    ],
  }),
}
</script>
