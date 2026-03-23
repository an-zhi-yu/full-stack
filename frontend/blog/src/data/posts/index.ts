/**
 * 文章数据聚合入口
 * 每新增一个分类，只需：
 *   1. 新建 xxx.ts，或像 Java 一样建子目录 xxx/index.ts 再拆多文件
 *   2. 在此文件 import 并 spread 进 allPosts
 */
import type { Post } from '../types'
import javaPosts from './java'

// ── 所有分类的文章合并为一个数组 ──────────────────────────────
const allPosts: Post[] = [
  ...javaPosts,
  // 后续追加：...frontendPosts, ...backendPosts, ...pythonPosts
]

export default allPosts

// ── 工具函数 ──────────────────────────────────────────────────

/** 按 id 查找文章 */
export function getPostById(id: string): Post | undefined {
  return allPosts.find((p) => p.id === id)
}

/** 按分类 slug 筛选文章 */
export function getPostsByCategory(slug: string): Post[] {
  return allPosts.filter((p) => p.categorySlug === slug)
}

/** 按标签名筛选文章 */
export function getPostsByTag(tag: string): Post[] {
  return allPosts.filter((p) => p.tags.includes(tag))
}

/** 获取最新 N 篇（默认 6 篇），按发布日期降序 */
export function getRecentPosts(count = 6): Post[] {
  return [...allPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count)
}

/** 获取所有置顶（pinned）文章 */
export function getFeaturedPosts(): Post[] {
  return allPosts.filter((p) => p.pinned)
}

/** 获取所有标签（去重） */
export function getAllTags(): string[] {
  const tags = allPosts.flatMap((p) => p.tags)
  return Array.from(new Set(tags))
}
