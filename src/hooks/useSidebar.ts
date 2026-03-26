import { ref } from "vue";

/** 侧边栏弹窗显示状态 */
const sidebarVisible = ref(false);

/** @description 侧边栏弹窗状态管理 hooks */
export const useSidebar = () => {
  /** @description 打开侧边栏弹窗 */
  const openSidebar = () => {
    sidebarVisible.value = true;
  };

  return {
    sidebarVisible,
    openSidebar,
  };
};
