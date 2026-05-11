import type { RouteRecordRaw } from "vue-router";

/** 静态路由表 */
const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/Home/index.vue"),
      },
    ],
  },
];

export default staticRouter;
