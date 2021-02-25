<template>
  <span>
    {{ displayCount }}
  </span>
</template>

<script>
export default {
  props: ["count"],
  computed: {
    displayCount() {
      const count = this.count
      if (count < 1000) {
        return count
      } else if (count >= 1000 && count < 1000000) {
        if (count % 1000 < 100) {
          return (count / 1000).toFixed(0) + "K"
        } else {
          return (count / 1000).toFixed(1) + "K"
        }
      } else {
        if (count % 1000000 < 100000) {
          return (count / 1000000).toFixed(0) + "M"
        } else {
          return (count / 1000000).toFixed(1) + "M"
        }
      }
    },
  },
}
</script>

<style></style>
