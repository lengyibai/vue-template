import type { LoginParams, LoginResult } from "./type";

import { API_URL } from "@/api/config";
import { request } from "@/api/helper";

/** @description 密码登录
 * @param data 登录参数
 */
export const login = (data: LoginParams) => {
  return request.post<LoginResult>(API_URL.AUTH.LOGIN, data);
};
