<template>
  <div class="home">
    <img width="60%" src="../assets/img/image.jpg" alt="Map Photo" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class HomePage extends Vue {}

export default HomePage;
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
