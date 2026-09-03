<script setup lang="ts"></script>

<template>
  <div class="home">
    <div v-for="(_, index) in 100" :key="index">滚动区域</div>
  </div>
</template>

<style scoped lang="less">
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #fff;
}
</style>
