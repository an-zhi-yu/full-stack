/**
 * 首页数据看板 - 4 组图表
 *
 * ① 文章分类分布    Donut（饼图）    各分类文章数占比
 * ② 阅读时长分布    Bar             各文章估算阅读时间
 * ③ 发布时间线      Bar             每天发布数量（最近 14 天）
 * ④ 热门文章 Top5   Horizontal Bar  基于 localStorage 访问次数
 *
 * 所有图表颜色均适配亮/暗主题（使用 CSS 变量 + 固定调色板）
 */
import { useMemo } from 'react'
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts'
import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'
import allPosts from '@/data/posts/index'
import { getAllVisitCounts } from '@/utils/visitStore'
import { useThemeStore } from '@/store/theme'
import styles from './DashboardCharts.module.less'

// ── 调色板 ────────────────────────────────────────────────────
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

// ── 子组件 ────────────────────────────────────────────────────

/** 自定义 Tooltip 外壳 */
function CustomTooltipBox({ active, payload, label }: {
  active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      {label && <div className={styles.tooltipLabel}>{label}</div>}
      {payload.map((p) => (
        <div key={p.name} className={styles.tooltipItem}>
          <span className={styles.tooltipDot} style={{ background: p.color }} />
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

/**
 * recharts 的 SVG stroke/fill 属性不支持 CSS 变量，必须通过 JS 动态传入颜色值。
 * 该 hook 根据当前主题返回图表所需的颜色令牌。
 */
function useChartColors() {
  const dark = useThemeStore((s) => s.dark)
  return useMemo(() => ({
    // 网格线：暗色主题用低透明度白，亮色主题用低透明度黑
    grid:  dark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)',
    // 坐标轴刻度文字
    tick:  dark ? 'rgba(255,255,255,0.40)' : 'rgba(15,23,42,0.42)',
    // 侧轴（较重些）
    tickY: dark ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.55)',
  }), [dark])
}

// ── 主组件 ────────────────────────────────────────────────────
export function DashboardCharts() {
  const colors = useChartColors()

  // ① 分类分布数据
  const catData = useMemo(() => {
    const countMap: Record<string, number> = {}
    allPosts.forEach((p) => {
      countMap[p.categorySlug] = (countMap[p.categorySlug] ?? 0) + 1
    })
    return categories
      .map((c) => ({ name: c.name, value: countMap[c.slug] ?? 0, color: c.color }))
      .filter((d) => d.value > 0)
  }, [])

  // ② 阅读时长数据（截取标题）
  const readTimeData = useMemo(() =>
    allPosts.map((p) => ({
      name: p.title.length > 10 ? p.title.slice(0, 10) + '…' : p.title,
      id: p.id,
      分钟: p.readTime,
    })), [])

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
      .map((p) => ({ name: p.title.slice(0, 12) + (p.title.length > 12 ? '…' : ''), id: p.id, 访问次数: counts[p.id] ?? 0 }))
      .sort((a, b) => b.访问次数 - a.访问次数)
      .slice(0, 5)
  }, [])

  const hasVisits = hotData.some((d) => d.访问次数 > 0)

  // recharts 渲染时 ResponsiveContainer 不支持 0 高度，加最小值保护
  return (
    <div className={styles.dashboard}>

      {/* ── ① 分类分布 ── */}
      <div className={styles.chartCard}>
        <div className={styles.chartTitle}>📊 文章分类分布</div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={catData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              label={({ name, value }) => `${name} ${value}`}
              labelLine={false}
            >
              {catData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltipBox />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ── ② 阅读时长 ── */}
      <div className={styles.chartCard}>
        <div className={styles.chartTitle}>⏱ 阅读时长分布（min）</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={readTimeData} margin={{ top: 4, right: 8, bottom: 30, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis
              dataKey="name"
              tick={{ fill: colors.tick, fontSize: 10 }}
              angle={-30}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fill: colors.tick, fontSize: 11 }} />
            <Tooltip content={<CustomTooltipBox />} />
            <Bar dataKey="分钟" fill="#6366f1" radius={[4, 4, 0, 0]}>
              {readTimeData.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── ③ 发布时间线 ── */}
      <div className={styles.chartCard}>
        <div className={styles.chartTitle}>📅 发布时间线（近 14 天）</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={timelineData} margin={{ top: 4, right: 8, bottom: 20, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis
              dataKey="day"
              tick={{ fill: colors.tick, fontSize: 10 }}
              interval={1}
              angle={-30}
              textAnchor="end"
            />
            <YAxis allowDecimals={false} tick={{ fill: colors.tick, fontSize: 11 }} />
            <Tooltip content={<CustomTooltipBox />} />
            <Bar dataKey="文章数" fill="#a855f7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── ④ 热门文章 ── */}
      <div className={styles.chartCard}>
        <div className={styles.chartTitle}>🔥 热门文章 Top 5</div>
        {hasVisits ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={hotData}
              layout="vertical"
              margin={{ top: 4, right: 16, bottom: 4, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} horizontal={false} />
              <XAxis type="number" tick={{ fill: colors.tick, fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={90}
                tick={{ fill: colors.tickY, fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltipBox />} />
              <Bar dataKey="访问次数" fill="#f59e0b" radius={[0, 4, 4, 0]}>
                {hotData.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          // 无访问数据时的占位提示
          <div className={styles.emptyChart}>
            <span>📖</span>
            <p>浏览文章后这里将显示热门排行</p>
            <Link to="/posts" className={styles.emptyLink}>去浏览文章 →</Link>
          </div>
        )}
      </div>

    </div>
  )
}
