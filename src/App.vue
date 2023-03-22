<script>
import Popup from '@/components/Popup.vue'

export default {
  name: 'TheApp',

  components: {
    Popup
  }
}
</script>

<template>
  <div id="app">
    <popup></popup>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to top left, blue, pink);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
