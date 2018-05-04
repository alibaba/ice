<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
};
</script>
