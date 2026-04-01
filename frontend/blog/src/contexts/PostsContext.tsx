/**
 * 文章列表：启动时从 Spring Boot 拉取；详情页再单独请求全文。
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Alert, Spin } from 'antd'
import { fetchPostSummaries, resetPostListFetchDedupe } from '@/api/blogApi'
import { sortPostsByDateDesc } from '@/data/posts/helpers'
import type { Post } from '@/data/types'

interface PostsContextValue {
  /** 按日期降序的摘要列表（content 为空数组） */
  posts: Post[]
  loading: boolean
  error: string | null
  reload: () => void
}

const PostsContext = createContext<PostsContextValue | null>(null)

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    resetPostListFetchDedupe()
    setLoading(true)
    setError(null)
    fetchPostSummaries()
      .then((list) => {
        setPosts(sortPostsByDateDesc(list))
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : String(e))
        setPosts([])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const value = useMemo(
    () => ({
      posts,
      loading,
      error,
      reload: load,
    }),
    [posts, loading, error, load],
  )

  if (loading && posts.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
        <Spin size="large" tip="正在从接口加载文章…（请先启动 blog-api）" />
      </div>
    )
  }

  if (error && posts.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          type="error"
          showIcon
          message="无法加载文章列表"
          description={
            <>
              <p>{error}</p>
              <p>
                请先在终端执行：<code>cd full-stack/backend/blog-api && mvn spring-boot:run</code>
                ，并确认已运行{' '}
                <code>npx tsx scripts/export-posts-to-backend.ts</code> 生成 <code>posts-full.json</code>。
              </p>
              <button type="button" onClick={load}>
                重试
              </button>
            </>
          }
        />
      </div>
    )
  }

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

export function usePostsContext(): PostsContextValue {
  const ctx = useContext(PostsContext)
  if (!ctx) {
    throw new Error('usePostsContext 必须在 PostsProvider 内使用')
  }
  return ctx
}
