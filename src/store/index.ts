import { createPinia } from "pinia";
import type { App } from "vue";

/** @description 安装状态管理 */
const setupStore = (app: App) => {
  /** Pinia 实例 */
  const pinia = createPinia();
  app.use(pinia);
};

export { setupStore };
