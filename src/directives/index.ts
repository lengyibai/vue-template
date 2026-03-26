import type { App } from "vue";

import { focus } from "./modules/focus";

/** @description 注册全局自定义指令 */
export const setupDirectives = (app: App) => {
  app.directive("focus", focus);
};
