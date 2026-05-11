<script setup lang="ts">
import Navbar from "./components/Navbar/index.vue";
</script>

<template>
  <div class="home">
    <Navbar />

    <div class="scroll-container">
      <div v-for="(_, index) in 100" :key="index">滚动区域</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  .scroll-container {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
