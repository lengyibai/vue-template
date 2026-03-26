import { useRouter } from "vue-router";

import { ROUTE_PATH } from "@/config";

/** @description 路由返回方法 */
type RouteBack = () => void;

/** @description 处理页面返回 */
export const useRouteBack = (): RouteBack => {
  /** 路由实例 */
  const router = useRouter();

  /** @description 返回上一页或首页 */
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(ROUTE_PATH.HOME);
  };

  return handleBack;
};
