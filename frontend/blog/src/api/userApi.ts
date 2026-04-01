import { request } from '@/api/request'

// 与后端 UserDTO 对齐的最小字段；后续可按实际 DTO 补充
export interface UserDTO {
  id: string
  username: string
}

export interface UserLoginDTO {
  username: string
  password: string
}

// 注册请求体，与后端 UserRegisterDTO 对齐
export interface UserRegisterDTO {
  username: string
  password: string
}

export interface UserLoginResponseDTO {
  token: string
  user: UserDTO
}

export interface ApiResult<T> {
  code: number
  message: string
  data: T
}

// 小工具：统一解包 ApiResult，保留业务错误 message
function unwrap<T>(res: ApiResult<T>): T {
  if (res.code !== 0) {
    throw new Error(res.message || '业务错误')
  }
  return res.data
}

// 登录：POST /api/v1/user/login
export async function login(payload: UserLoginDTO): Promise<UserLoginResponseDTO> {
  const res = await request.post<ApiResult<UserLoginResponseDTO>>('/v1/user/login', payload)
  return unwrap(res as unknown as ApiResult<UserLoginResponseDTO>)
}

// 注册：POST /api/v1/user
export async function register(payload: UserRegisterDTO): Promise<UserDTO> {
  const res = await request.post<ApiResult<UserDTO>>('/v1/user', payload)
  return unwrap(res as unknown as ApiResult<UserDTO>)
}
