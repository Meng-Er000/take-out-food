<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide.vue'
export default {
  components: {
    FooterGuide
  }
}
</script>

<style scoped>
  .app{
    width: 100%;
    height: 100%;
  }
</style>
