<script setup lang="ts">
import Tabbar from "./components/Tabbar/index.vue";
import Sidebar from "./components/Sidebar/index.vue";

import { useSidebar } from "@/hooks";

/** 侧边栏弹窗 hooks */
const { sidebarVisible } = useSidebar();
</script>

<template>
  <div class="layout">
    <!--页面内容区域-->
    <div class="layout-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <!--底部主导航-->
    <Tabbar />

    <!--全局侧边栏弹窗-->
    <Sidebar v-model="sidebarVisible" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
