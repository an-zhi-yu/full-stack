/**
 * 纯函数：对 Post[] 做筛选/排序，不依赖数据来源（静态或接口）。
 */
import type { Post } from '../types'

export function getPostById(posts: Post[], id: string): Post | undefined {
  return posts.find((p) => p.id === id)
}

export function getPostsByCategory(posts: Post[], slug: string): Post[] {
  return posts.filter((p) => p.categorySlug === slug)
}

export function getPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter((p) => p.tags.includes(tag))
}

export function getRecentPosts(posts: Post[], count = 6): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count)
}

export function getFeaturedPosts(posts: Post[]): Post[] {
  return posts.filter((p) => p.pinned)
}

export function getAllTags(posts: Post[]): string[] {
  const tags = posts.flatMap((p) => p.tags)
  return Array.from(new Set(tags))
}

/** 与接口列表顺序一致：按日期新→旧（用于上一篇/下一篇） */
export function sortPostsByDateDesc(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}
