<script setup lang="ts">
const modelValue = defineModel<boolean>({ required: true });

/** @description 关闭侧边栏 */
const handleClose = () => {
  modelValue.value = false;
};
</script>

<template>
  <div class="base-background" :class="{ 'base-background-visible': modelValue }">
    <transition name="mask-animation" appear>
      <div v-if="modelValue" class="bg" @click="handleClose"></div>
    </transition>

    <transition name="sidebar-animation" appear>
      <div v-if="modelValue" class="sidebar"></div>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
