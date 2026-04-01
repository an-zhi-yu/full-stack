import axios from 'axios'

// 后端地址：
// - 开发环境默认走 Vite 代理：/api -> http://localhost:8080
// - 也支持通过 VITE_API_BASE 单独指定（例如线上网关）
const baseURL = import.meta.env.VITE_API_BASE ?? '/api'

/**
 * 统一 HTTP 客户端（给前端自己用的「精简版 axios 封装」）：
 * - 自动带上 JWT：Authorization: Bearer <token>
 * - 后端返回 ApiResult<T>，这里直接返回 res.data（即 ApiResult 对象），由调用方自己判断 code
 * - 收到 401 时清理本地 token 并跳转 /login
 */
export const request = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// 请求拦截：注入 token
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err),
)

// 响应拦截：统一处理 401，其它错误交给调用方
request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      // 简单处理：直接跳登录页；真实项目里可以用路由跳转
      window.location.href = '/login'
    }
    return Promise.reject(err)
  },
)
