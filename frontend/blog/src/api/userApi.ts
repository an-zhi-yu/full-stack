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

// 用户列表：GET /api/v1/user
export async function getUsers(): Promise<UserDTO[]> {
  const res = await request.get<ApiResult<UserDTO[]>>('/v1/user')
  return unwrap(res as unknown as ApiResult<UserDTO[]>)
}

// 用户详情：GET /api/v1/user/{id}
export async function getUserById(id: string): Promise<UserDTO> {
  const res = await request.get<ApiResult<UserDTO>>(`/v1/user/${id}`)
  return unwrap(res as unknown as ApiResult<UserDTO>)
}

