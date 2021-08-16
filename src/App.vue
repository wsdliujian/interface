<template>
  <div id="app">
<!--    <div id="nav">
      <router-link to="/">Home1</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>-->
      <dataView />
  </div>
</template>
<script>
import dataView from './views/datav/index.vue'

export default {
  name: 'App',
  components: {
    dataView
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
