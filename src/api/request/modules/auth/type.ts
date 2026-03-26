/** @description 登录请求参数 */
export interface LoginParams {
  /** 用户名 */
  username?: string;
  /** 手机国家码 */
  mobile_country_code?: string;
  /** 手机号 */
  mobile?: string;
  /** 邮箱 */
  email?: string;
  /** 密码 */
  password: string;
  /** 一次性验证码 */
  otp?: string;
}

/** @description 登录返回数据 */
export interface LoginResult {
  /** 登录令牌 */
  token: string;
  /** 令牌过期时间 */
  expires_at: string;
}
