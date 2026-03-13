/**
 * 访问记录工具
 * 使用 localStorage 存储每篇文章的访问数据
 * key: BZW_VISITS（全局单一 key，存储所有文章）
 *
 * 数据结构：
 * {
 *   [postId]: {
 *     count: number,           // 总访问次数
 *     lastVisit: number,       // 最近访问时间戳 (ms)
 *     records: VisitRecord[]   // 最近 50 条记录（含访问者信息）
 *   }
 * }
 *
 * 用户信息说明：
 * 目前博客仅博主（安知鱼）使用，userId/username 来自 Zustand user store。
 * 后续接入真实登录后，user store 会自动切换用户，此处无需改动。
 */

const STORAGE_KEY = 'bzw_visits'
const MAX_RECORDS  = 50    // 每篇文章最多保留的记录条数

export interface VisitRecord {
  /** 访问用户 ID */
  userId: string
  /** 访问用户显示名 */
  username: string
  /** 访问时间（毫秒时间戳） */
  timestamp: number
  /** 停留时长（秒），用户离开时写入 */
  duration: number
}

export interface PostVisitData {
  count: number
  lastVisit: number
  records: VisitRecord[]
}

type VisitStore = Record<string, PostVisitData>

// ── 内部工具 ──────────────────────────────────────────────────

function load(): VisitStore {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as VisitStore
  } catch {
    return {}
  }
}

function save(store: VisitStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // 无痕/隐私模式下 localStorage 可能不可用，静默失败
  }
}

// ── 公开 API ──────────────────────────────────────────────────

/**
 * 记录一次访问开始（进入页面时调用）
 * @param postId   文章 id
 * @param userId   访问者 id（来自 user store）
 * @param username 访问者显示名（来自 user store）
 * @returns visitId（即本次访问的时间戳），用于后续 endVisit
 */
export function startVisit(postId: string, userId: string, username: string): number {
  const store = load()
  const now   = Date.now()

  if (!store[postId]) {
    store[postId] = { count: 0, lastVisit: now, records: [] }
  }

  store[postId].count++
  store[postId].lastVisit = now

  // 先插入一条 duration=0 的记录，等页面离开时更新
  store[postId].records.unshift({ userId, username, timestamp: now, duration: 0 })
  // 超出上限时裁剪
  if (store[postId].records.length > MAX_RECORDS) {
    store[postId].records = store[postId].records.slice(0, MAX_RECORDS)
  }

  save(store)
  return now  // 返回 visitId（即访问时间戳）
}

/**
 * 记录访问结束，更新停留时长（离开页面时调用）
 * @param postId 文章 id
 * @param visitId startVisit 返回的 visitId（时间戳）
 */
export function endVisit(postId: string, visitId: number) {
  const store = load()
  if (!store[postId]) return

  const duration = Math.round((Date.now() - visitId) / 1000)
  const record   = store[postId].records.find((r) => r.timestamp === visitId)
  if (record) record.duration = duration

  save(store)
}

/** 获取某篇文章的访问数据 */
export function getVisitData(postId: string): PostVisitData | null {
  const store = load()
  return store[postId] ?? null
}

/** 获取所有文章访问次数（用于首页排行） */
export function getAllVisitCounts(): Record<string, number> {
  const store = load()
  return Object.fromEntries(
    Object.entries(store).map(([id, data]) => [id, data.count]),
  )
}

/** 获取所有文章的平均停留时长（秒） */
export function getAvgDuration(postId: string): number {
  const data = getVisitData(postId)
  if (!data || data.records.length === 0) return 0

  const withDuration = data.records.filter((r) => r.duration > 0)
  if (withDuration.length === 0) return 0

  const total = withDuration.reduce((sum, r) => sum + r.duration, 0)
  return Math.round(total / withDuration.length)
}

/** 格式化时间戳为相对时间（X分钟前 / X天前）*/
export function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)

  if (mins < 1)   return '刚刚'
  if (mins < 60)  return `${mins} 分钟前`
  if (hours < 24) return `${hours} 小时前`
  if (days < 30)  return `${days} 天前`
  return `${Math.floor(days / 30)} 个月前`
}

/** 格式化秒数为可读时长（"1分30秒" / "2分钟" / "30秒"）*/
export function formatDuration(seconds: number): string {
  if (seconds <= 0) return '-'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s} 秒`
  if (s === 0) return `${m} 分钟`
  return `${m} 分 ${s} 秒`
}
