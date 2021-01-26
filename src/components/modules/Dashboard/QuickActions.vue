<template>
  <div v-if="quickAddItems" class="quick-actions">
    <quick-action-item v-for="item in quickAddItems" :key="item.route" :item="item" />
  </div>
</template>

<script>
import QuickActionItem from "@/components/modules/Dashboard/QuickActionItem.vue"

export default {
  components: {
    QuickActionItem,
  },
  data: () => ({
    quickAddItems: [
      {
        icon: "mdi-refresh",
        route: "create-article",
        title: "Add article",
      },
      {
        icon: "mdi-refresh",
        route: "create-survey",
        title: "Add survey",
      },
      {
        icon: "mdi-refresh",
        route: "create-group",
        title: "Add group",
      },
      {
        icon: "mdi-refresh",
        route: "create-person",
        title: "Add person",
      },
      {
        icon: "mdi-refresh",
        route: "create-role",
        title: "Add role",
      },
      {
        icon: "mdi-refresh",
        route: "create-skill",
        title: "Add skill",
      },
      {
        icon: "mdi-refresh",
        route: "create-objective",
        title: "Add objective",
      },
      {
        icon: "mdi-refresh",
        route: "create-review",
        title: "Add review",
      },
      {
        icon: "mdi-refresh",
        route: "create-absence",
        title: "Add absence",
      },
      {
        icon: "mdi-refresh",
        route: "create-task",
        title: "Add task",
      },
    ],
    showQuickActions: false,
  }),
}
</script>

<style scoped>
.quick-actions {
  display: flex;
  flex-wrap: wrap;
  padding: 12px 8px;
}
</style>
