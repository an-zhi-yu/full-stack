import { useEffect, useState } from 'react'
import { fetchPostDetail, postRecordView } from '@/api/blogApi'
import type { Post } from '@/data/types'

export function usePostDetail(id: string | undefined) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(Boolean(id))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setPost(null)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchPostDetail(id)
      .then((p) => {
        if (!cancelled) {
          setPost(p)
        }
        // 进入详情后上报浏览（后端 +1），用返回的累计值刷新展示
        if (p && id) {
          postRecordView(id)
            .then((vc) => {
              if (!cancelled) {
                setPost((prev) => (prev ? { ...prev, viewCount: vc } : null))
              }
            })
            .catch(() => {
              /* 上报失败不影响阅读 */
            })
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e))
          setPost(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  return { post, loading, error }
}
