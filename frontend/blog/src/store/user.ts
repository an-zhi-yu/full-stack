/**
 * 当前用户 Store
 *
 * 目前只有博主自己（安知鱼），后续接入登录体系后只需在登录成功回调中
 * 调用 setUser() 替换即可，其余访问记录逻辑无需修改。
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CurrentUser {
  userId: string
  username: string
  /** 头像 emoji 或 URL，暂时用 emoji 占位 */
  avatar: string
  /** true = 已登录（将来接入真实鉴权时使用） */
  isLoggedIn: boolean
}

interface UserState extends CurrentUser {
  setUser: (user: Omit<UserState, 'setUser' | 'clearUser'>) => void
  clearUser: () => void
}

const DEFAULT_USER: CurrentUser = {
  userId:    'anzhiyu',
  username:  '安知鱼',
  avatar:    '🐟',
  isLoggedIn: false,
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...DEFAULT_USER,
      setUser:   (user) => set(user),
      clearUser: ()     => set(DEFAULT_USER),
    }),
    { name: 'bzw-user' },
  ),
)
