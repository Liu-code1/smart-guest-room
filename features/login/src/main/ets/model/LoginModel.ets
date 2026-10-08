/**
 * 登录请求接口
 */
export interface LoginRequest {
  roomNo: string;
  userName: string;
}

/**
 * 登录响应接口
 */
export interface LoginResponse {
  code: number;
  msg: string;
  data: string;
}