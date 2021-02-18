<template>
  <v-app>
    <!-- named routes, named views -->
    <router-view name="NavBar"></router-view>
    <router-view name="StudioNavBar"></router-view>
    <!-- <v-main
      :class="{
        'content-bg': !['SignIn', 'SignUp', 'Dashboard', 'Video', 'Detail'].includes(
          this.$route.name
        )
          ? true
          : false,
      }"
    > -->
    <v-main :class="$vuetify.theme.dark ? '' : 'content-bg-light'">
      <transition name="moveInUp">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
}
</script>

<style lang="scss">
/* .content-bg {
  background-color: #f9f9f9;
} */
/* .card {
  background: #f9f9f9 !important;
} */
.content-bg-light {
  background-color: #f9f9f9;
}
.moveInUp-enter-active {
  animation: fadeIn 0.9s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  33% {
    opacity: 0;
  }
  66% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
  /* 0% {
    transform: translateX(1000px);
  }
  100% {
    transform: translateX(0);
  } */
}
.moveInUp-leave-active {
  animation: moveInUp 0.3s ease-in;
}
@keyframes moveInUp {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }

  /* 0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1000px);
  } */
}
</style>
