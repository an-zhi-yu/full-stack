import { useEffect, useState } from 'react'
import { fetchPostDetail } from '@/api/blogApi'
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
