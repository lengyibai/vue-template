<script setup lang="ts">
import { useSidebar } from "@/layout/components/Sidebar/hooks/useSidebar";

const { sidebarVisible } = useSidebar();
</script>

<template>
  <div class="navbar" @click="sidebarVisible = true">导航栏</div>
</template>

<style scoped lang="less">
.navbar {
  height: 50px;
  background-color: var(--blue);
}
</style>
