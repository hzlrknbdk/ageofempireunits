<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/units">Units Page</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class App extends Vue {}

export default App;
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;
  color: #2c3e50;
  text-align: end;
  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 20px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
