<template>
  <div class="progress-stacked grey lighten-3">
    <v-tooltip
      v-for="item in collection"
      :key="`progress-item-key-${item.id}`"
      :color="item.color"
      top
    >
      <template #activator="{ on }">
        <span :style="`width:${GetWidth(item.value)}%`" :class="item.color" v-on="on"></span>
      </template>
      {{ item.title }} {{ item.value }}
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "ProgressStacked",

  props: {
    collection: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    collectionTotal() {
      return this.collection && this.collection.length > 0
        ? this.collection.reduce((acc, obj) => acc + obj.value, 0)
        : null
    },
  },

  methods: {
    GetWidth(value) {
      return this.collectionTotal && value ? Math.round((value / this.collectionTotal) * 100) : null
    },
  },
}
</script>

<style>
.progress-stacked {
  display: flex;
  height: 16px;
}
</style>
