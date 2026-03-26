import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";

import routes from "./routes";

/** 路由实例 */
const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.noAnimation && from.meta.noAnimation) {
      return;
    }

    if (savedPosition)
      return {
        ...savedPosition,
        behavior: "smooth",
      };

    return { top: 0, behavior: "smooth" };
  },
});

/* 路由切换后同步页面标题 */
router.afterEach((to) => {
  document.title = `${to.meta.title} - Gem Game Studios`;
});

/** @description 安装路由 */
const setupRouter = (app: App) => {
  app.use(router);
};

export { router, setupRouter };
