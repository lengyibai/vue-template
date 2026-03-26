import type { RouteRecordRaw } from "vue-router";

/** 静态路由表 */
const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/Home/index.vue"),
  },
];

export default staticRouter;
