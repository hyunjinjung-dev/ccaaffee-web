<template>
  <div class="avatar-group">
    <v-tooltip v-for="person in people" :key="`avatar-person-${person.id}`" top>
      <template v-slot:activator="{ on }">
        <v-avatar size="32px" v-on="on">
          <img :alt="person.fullName" :src="person.avatarUrl" />
        </v-avatar>
      </template>
      <span>
        <b>{{ person.fullName }}</b>
        <br />
        {{ person.role }}
      </span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "AvatarGroup",
  props: {
    people: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>
.avatar-group {
  display: flex;
  height: 48px;
  padding: 0 16px;
}
.avatar-group .v-avatar img {
  transition: all 0.2s;
}
.avatar-group .v-avatar:not(:last-child) {
  margin-right: -8px;
}
.avatar-group .v-avatar:hover img {
  height: 40px;
  width: 40px;
  z-index: 1;
}
</style>
