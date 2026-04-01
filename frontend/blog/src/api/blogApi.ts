/**
 * 博客后端 API（通过 Vite proxy 访问 /api → localhost:8080）
 *
 * 【为何开发时 Network 里会看到同一接口打两次？】
 * React 18 在开发环境默认开启 <StrictMode>，会故意「挂载 → 卸载 → 再挂载」子树，
 * 导致 useEffect 跑两遍，从而触发两次 fetch。这是官方用来帮你发现副作用问题的。
 * 下面用「进行中的 Promise 合并」：同一时刻重复的列表/详情请求会共用一次网络请求。
 * 生产 build 默认不再有 Strict 双调用，一般只会请求一次。
 */
import type { ContentBlock, Post } from '@/data/types'

export interface ApiResult<T> {
  code: number
  message: string
  data: T
}

/** 与 Java PostSummary 字段一致 */
export interface PostSummaryDto {
  id: string
  title: string
  subtitle: string
  category: string
  categorySlug: string
  tags: string[]
  date: string
  readTime: number
  pinned?: boolean
}

function unwrap<T>(j: ApiResult<T>): T {
  if (j.code !== 0) {
    throw new Error(j.message || '接口返回 code !== 0')
  }
  return j.data
}

/** 列表项：无正文，仅占位（列表页、图表等不需要 content） */
export function stubFromSummary(s: PostSummaryDto): Post {
  return {
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    category: s.category,
    categorySlug: s.categorySlug,
    tags: s.tags,
    date: s.date,
    readTime: s.readTime,
    pinned: s.pinned,
    content: [],
  }
}

// ── 列表：并发去重（StrictMode 下两次 effect 共用一次 fetch）────────────────
let postListInflight: Promise<Post[]> | null = null

export async function fetchPostSummaries(): Promise<Post[]> {
  if (postListInflight) {
    return postListInflight
  }
  postListInflight = (async () => {
    const res = await fetch('/api/v1/posts')
    if (!res.ok) {
      throw new Error(`列表请求失败 HTTP ${res.status}`)
    }
    const j = (await res.json()) as ApiResult<PostSummaryDto[]>
    const data = unwrap(j)
    return data.map(stubFromSummary)
  })()
  try {
    return await postListInflight
  } finally {
    postListInflight = null
  }
}

/** 手动刷新列表前调用，避免命中旧的去重状态（PostsProvider.reload） */
export function resetPostListFetchDedupe() {
  postListInflight = null
}

// ── 详情：按 id 并发去重 ───────────────────────────────────────────────────
const detailInflight = new Map<string, Promise<Post | null>>()

/** 详情：含 content；404 返回 null */
export async function fetchPostDetail(id: string): Promise<Post | null> {
  const existing = detailInflight.get(id)
  if (existing) {
    return existing
  }
  const p = (async () => {
    const res = await fetch(`/api/v1/posts/${encodeURIComponent(id)}`)
    const j = (await res.json()) as ApiResult<Record<string, unknown>>
    if (res.status === 404) {
      return null
    }
    if (res.ok && j.code === 0) {
      return normalizeBlogPost(j.data as Record<string, unknown>)
    }
    throw new Error(j.message || `详情请求失败 HTTP ${res.status}`)
  })().finally(() => {
    detailInflight.delete(id)
  })
  detailInflight.set(id, p)
  return p
}

function normalizeBlogPost(data: Record<string, unknown>): Post {
  return {
    id: String(data.id),
    title: String(data.title),
    subtitle: String(data.subtitle),
    category: String(data.category),
    categorySlug: String(data.categorySlug),
    tags: (data.tags as string[]) ?? [],
    date: String(data.date),
    readTime: Number(data.readTime),
    pinned: data.pinned as boolean | undefined,
    content: (data.content as ContentBlock[]) ?? [],
  }
}
