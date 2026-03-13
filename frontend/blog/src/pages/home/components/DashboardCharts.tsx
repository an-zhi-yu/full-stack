/**
 * 首页数据看板 - 4 组图表
 *
 * 使用 @ant-design/plots v2（基于 G2 v5），与 Ant Design 生态深度集成：
 * ① 文章分类分布  Donut（环形图）   各分类文章数占比
 * ② 阅读时长分布  Column（柱形图）  各文章估算阅读时间
 * ③ 发布时间线    Column（柱形图）  每天发布数量（最近 14 天）
 * ④ 热门文章 Top5 Bar（条形图）    基于 localStorage 访问次数
 *
 * 主题切换：直接传 theme="classicDark" | "classic"，无需手动计算颜色值。
 */
import { useMemo } from 'react'
import { Pie, Column, Bar } from '@ant-design/plots'
import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'
import allPosts from '@/data/posts/index'
import { getAllVisitCounts } from '@/utils/visitStore'
import { useThemeStore } from '@/store/theme'
import styles from './DashboardCharts.module.less'

// ── 调色板（与 categories.ts 颜色系统保持一致）────────────────
const PALETTE = ['#6366f1', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#10b981']

// ── 工具 ──────────────────────────────────────────────────────

/** 计算最近 N 天的日期标签（格式 "03/06"）*/
function recentDays(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(Date.now() - (n - 1 - i) * 86_400_000)
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
  })
}

/** 日期字符串 "2026-03-12" → "03/12" */
function toShortDate(iso: string): string {
  const [, m, d] = iso.split('-')
  return `${m}/${d}`
}

// ── 类型 ──────────────────────────────────────────────────────
interface CategoryItem {
  name: string
  value: number
  color: string
}

// ── 主组件 ────────────────────────────────────────────────────
export function DashboardCharts() {
  const dark = useThemeStore((s) => s.dark)
  // @ant-design/plots 内置主题：classicDark / classic，无需手动计算颜色
  const theme = dark ? 'classicDark' : 'classic'

  // ① 分类分布数据
  const catData = useMemo<CategoryItem[]>(() => {
    const countMap: Record<string, number> = {}
    allPosts.forEach((p) => {
      countMap[p.categorySlug] = (countMap[p.categorySlug] ?? 0) + 1
    })
    return categories
      .map((c) => ({ name: c.name, value: countMap[c.slug] ?? 0, color: c.color }))
      .filter((d) => d.value > 0)
  }, [])

  // ② 阅读时长数据（截取标题）
  const readTimeData = useMemo(
    () =>
      allPosts.map((p) => ({
        name: p.title.length > 10 ? p.title.slice(0, 10) + '…' : p.title,
        分钟: p.readTime,
      })),
    []
  )

  // ③ 发布时间线（最近 14 天）
  const timelineData = useMemo(() => {
    const days = recentDays(14)
    const countMap: Record<string, number> = {}
    allPosts.forEach((p) => {
      const key = toShortDate(p.date)
      countMap[key] = (countMap[key] ?? 0) + 1
    })
    return days.map((day) => ({ day, 文章数: countMap[day] ?? 0 }))
  }, [])

  // ④ 热门文章 Top 5（基于 localStorage）
  const hotData = useMemo(() => {
    const counts = getAllVisitCounts()
    return allPosts
      .map((p) => ({
        name: p.title.slice(0, 12) + (p.title.length > 12 ? '…' : ''),
        id: p.id,
        访问次数: counts[p.id] ?? 0,
      }))
      .sort((a, b) => b.访问次数 - a.访问次数)
      .slice(0, 5)
  }, [])

  const hasVisits = hotData.some((d) => d.访问次数 > 0)

  return (
    <div className={styles.dashboard}>
      {/* ── ① 分类分布 ── */}
      <div className={styles.chartCard}>
        <div className={styles.chartTitle}>📊 文章分类分布</div>
        <div className={styles.chartBox}>
          <Pie
            data={catData}
            angleField="value"
            colorField="name"
            innerRadius={0.6}
            theme={theme}
            autoFit
            legend={false}
            scale={{
              color: {
                domain: catData.map((d) => d.name),
                range: catData.map((d) => d.color),
              },
            }}
            label={{
              text: (d: CategoryItem) => `${d.name} ${d.value}`,
              style: { fontSize: 11, fontWeight: 500 },
            }}
            tooltip={{
              items: [{ field: 'value', name: '文章数' }],
            }}
          />
        </div>
      </div>

      {/* ── ② 阅读时长 ── */}
      <div className={styles.chartCard}>
        <div className={styles.chartTitle}>⏱ 阅读时长分布（min）</div>
        <div className={styles.chartBox}>
          <Column
            data={readTimeData}
            xField="name"
            yField="分钟"
            theme={theme}
            autoFit
            colorField="name"
            scale={{ color: { range: PALETTE } }}
            label={false}
            axis={{ x: { label: false } }}
          />
        </div>
      </div>

      {/* ── ③ 发布时间线 ── */}
      <div className={styles.chartCard}>
        <div className={styles.chartTitle}>📅 发布时间线（近 14 天）</div>
        <div className={styles.chartBox}>
          <Column
            data={timelineData}
            xField="day"
            yField="文章数"
            theme={theme}
            autoFit
            style={{ fill: '#a855f7' }}
            label={false}
            axis={{
              y: { labelFormatter: (v: number) => String(Math.floor(v)) },
            }}
          />
        </div>
      </div>

      {/* ── ④ 热门文章 ── */}
      <div className={styles.chartCard}>
        <div className={styles.chartTitle}>🔥 热门文章 Top 5</div>
        {hasVisits ? (
          <div className={styles.chartBox}>
            <Bar
              data={hotData}
              xField="name"
              yField="访问次数"
              theme={theme}
              autoFit
              colorField="name"
              scale={{ color: { range: PALETTE } }}
              label={false}
            />
          </div>
        ) : (
          // 无访问数据时的占位提示
          <div className={styles.emptyChart}>
            <span>📖</span>
            <p>浏览文章后这里将显示热门排行</p>
            <Link to="/posts" className={styles.emptyLink}>
              去浏览文章 →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
