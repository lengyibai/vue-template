<script setup lang="ts"></script>

<template>
  <!--页面路由出口-->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
