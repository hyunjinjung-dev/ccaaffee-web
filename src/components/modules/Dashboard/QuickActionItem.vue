<template>
  <v-card v-if="item" class="quick-actions__item" hover>
    <v-icon>{{ item.icon }}</v-icon>
    <span class="quick-actions__item--title">{{ item.title }}</span>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      default: () => {},
      type: Object,
    },
  },
}
</script>

<style scoped>
.v-card--hover:hover {
  transform: translateY(-2px);
}

.quick-actions__item {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 8px;
  padding: 8px 16px;
}

.quick-actions__item--title {
  font-size: 90%;
  margin-top: 4px;
  text-transform: uppercase;
}
</style>
