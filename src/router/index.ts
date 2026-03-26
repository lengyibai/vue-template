import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";

import routes from "./routes";

/** 路由实例 */
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

/* 路由切换后同步页面标题 */
router.afterEach((to) => {
  document.title = `${to.meta.title} - Vue`;
});

/** @description 安装路由 */
const setupRouter = (app: App) => {
  app.use(router);
};

export { router, setupRouter };
