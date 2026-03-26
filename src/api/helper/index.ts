import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import type { ResultData } from "../interface";

import { AuthStore } from "@/store/modules/auth";

/** 请求配置 */
const config = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
};

/** @description 请求工具类 */
class RequestHttp {
  /** Axios实例 */
  service: AxiosInstance;

  /** @description 构造请求实例
   * @param axiosConfig Axios配置
   */
  public constructor(axiosConfig: AxiosRequestConfig) {
    this.service = axios.create(axiosConfig);

    /** @description 注册请求拦截器 */
    this.service.interceptors.request.use(
      (requestConfig: InternalAxiosRequestConfig) => {
        /** 请求头对象 */
        const headers = requestConfig.headers;
        /** 登录令牌 */
        const token = AuthStore().token;

        headers["x-site"] = "s558";

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        return requestConfig;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    /** @description 注册响应拦截器 */
    this.service.interceptors.response.use(
      (response: AxiosResponse<ResultData>) => {
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  /** @description 发送GET请求
   * @param url 请求地址
   * @param params 查询参数
   * @param requestConfig 额外配置
   */
  get<T = any>(url: string, params = {}, requestConfig = {}): Promise<AxiosResponse<ResultData<T>>> {
    return this.service.get(url, { params, ...requestConfig });
  }

  /** @description 发送POST请求
   * @param url 请求地址
   * @param params 请求参数
   * @param requestConfig 额外配置
   */
  post<T = any>(url: string, params = {}, requestConfig = {}): Promise<AxiosResponse<ResultData<T>>> {
    return this.service.post(url, params, requestConfig);
  }

  /** @description 发送PATCH请求
   * @param url 请求地址
   * @param params 请求参数
   * @param requestConfig 额外配置
   */
  patch<T = any>(url: string, params = {}, requestConfig = {}): Promise<AxiosResponse<ResultData<T>>> {
    return this.service.patch(url, params, requestConfig);
  }

  /** @description 发送PUT请求
   * @param url 请求地址
   * @param params 请求参数
   * @param requestConfig 额外配置
   */
  put<T = any>(url: string, params = {}, requestConfig = {}): Promise<AxiosResponse<ResultData<T>>> {
    return this.service.put(url, params, requestConfig);
  }

  /** @description 发送DELETE请求
   * @param url 请求地址
   * @param params 查询参数
   * @param requestConfig 额外配置
   */
  delete<T = any>(url: string, params?: any, requestConfig = {}): Promise<AxiosResponse<ResultData<T>>> {
    return this.service.delete(url, { params, ...requestConfig });
  }
}

/** 请求实例 */
const request = new RequestHttp(config);

export { request };
