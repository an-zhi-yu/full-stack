import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE ?? '/api'

export const request = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

request.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err),
)

request.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err),
)
