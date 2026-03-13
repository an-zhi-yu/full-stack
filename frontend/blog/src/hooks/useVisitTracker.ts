/**
 * 文章访问追踪 Hook
 * - 进入页面时调用 startVisit 计数，携带当前用户信息
 * - 页面卸载或切换时调用 endVisit 记录停留时长
 * - 返回该文章的访问统计数据，供 UI 展示
 *
 * 用户信息来源：useUserStore（目前默认安知鱼，登录后自动切换）
 */
import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '@/store/user'
import {
  startVisit,
  endVisit,
  getVisitData,
  getAvgDuration,
  type PostVisitData,
} from '@/utils/visitStore'

export interface VisitStats {
  /** 总访问次数 */
  count: number
  /** 最近一次访问的时间戳（本次访问之前的上一次） */
  lastVisitTime: number | null
  /** 平均停留时长（秒） */
  avgDuration: number
  /** 最近 10 条访问记录 */
  recentRecords: PostVisitData['records']
}

/**
 * @param postId 文章唯一 id
 * @returns 当前文章的访问统计数据
 */
export function useVisitTracker(postId: string): VisitStats {
  const visitIdRef = useRef<number>(0)
  const userId   = useUserStore((s) => s.userId)
  const username = useUserStore((s) => s.username)

  const [stats, setStats] = useState<VisitStats>({
    count: 0,
    lastVisitTime: null,
    avgDuration: 0,
    recentRecords: [],
  })

  useEffect(() => {
    if (!postId) return

    // 先读取上一次（历史）数据，再记录本次访问
    const prevData      = getVisitData(postId)
    const prevLastVisit = prevData?.lastVisit ?? null

    // 记录本次访问开始，携带用户信息
    const visitId = startVisit(postId, userId, username)
    visitIdRef.current = visitId

    // 读取刚写入后的最新数据
    const fresh = getVisitData(postId)
    setStats({
      count:         fresh?.count       ?? 1,
      lastVisitTime: prevLastVisit,          // 展示上次访问时间（本次之前）
      avgDuration:   getAvgDuration(postId),
      recentRecords: (fresh?.records ?? []).slice(0, 10),
    })

    // 页面卸载或 postId 变化时记录停留时长
    return () => {
      endVisit(postId, visitIdRef.current)
    }
  }, [postId, userId, username])

  return stats
}
