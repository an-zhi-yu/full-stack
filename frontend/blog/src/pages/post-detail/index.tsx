/**
 * 文章详情页（/post/:id）
 * 布局：面包屑 → 文章头 → [正文 + 侧边栏（目录 / 访问记录 / 相关文章）] → 上下篇导航
 */
import { useParams, Link, Navigate } from 'react-router-dom'
import { Tag, Tooltip } from 'antd'
import { EyeOutlined, HistoryOutlined } from '@ant-design/icons'
import { getPostById, getPostsByCategory } from '@/data/posts/index'
import allPosts from '@/data/posts/index'
import { ContentRenderer } from '@/components/post/ContentRenderer'
import { useVisitTracker } from '@/hooks/useVisitTracker'
import { timeAgo, formatDuration } from '@/utils/visitStore'
import styles from './index.module.less'

export default function PostDetail() {
  const { id = '' } = useParams<{ id: string }>()
  const post = getPostById(id)

  // 追踪本次访问，返回历史统计
  const visitStats = useVisitTracker(id)

  if (!post) return <Navigate to="/404" replace />

  // 目录：从内容块提取 heading
  const toc = post.content.filter(
    (b): b is Extract<typeof b, { type: 'heading' }> => b.type === 'heading',
  )

  // 相关文章：同分类、排除自身、最多 4 篇
  const related = getPostsByCategory(post.categorySlug)
    .filter((p) => p.id !== post.id)
    .slice(0, 4)

  // 上一篇 / 下一篇
  const idx  = allPosts.findIndex((p) => p.id === post.id)
  const prev = idx > 0                   ? allPosts[idx - 1] : null
  const next = idx < allPosts.length - 1 ? allPosts[idx + 1] : null

  return (
    <div className={styles.page}>

      {/* 面包屑 */}
      <nav className={styles.breadcrumb} aria-label="面包屑">
        <Link to="/"                          className={styles.breadLink}>首页</Link>
        <span className={styles.breadSep}>›</span>
        <Link to={`/category/${post.categorySlug}`} className={styles.breadLink}>{post.category}</Link>
        <span className={styles.breadSep}>›</span>
        <span className={styles.breadCurrent}>{post.title}</span>
      </nav>

      {/* 文章头部 */}
      <header className={styles.header}>
        <div className={styles.categoryBadge}>{post.category}</div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.subtitle}>{post.subtitle}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>📅 {post.date}</span>
          <span className={styles.metaDot}>·</span>
          <span className={styles.metaItem}>⏱ {post.readTime} min read</span>
          {/* 实时访问计数 */}
          {visitStats.count > 0 && (
            <>
              <span className={styles.metaDot}>·</span>
              <Tooltip title={`平均停留 ${formatDuration(visitStats.avgDuration)}`}>
                <span className={styles.metaItem}>
                  <EyeOutlined style={{ marginRight: 4 }} />
                  {visitStats.count} 次访问
                </span>
              </Tooltip>
            </>
          )}
        </div>

        <div className={styles.tags}>
          {post.tags.map((t) => (
            <Tag key={t} className={styles.tag}>{t}</Tag>
          ))}
        </div>
      </header>

      {/* 正文 + 侧边栏 */}
      <div className={styles.layout}>

        <article className={styles.article}>
          <ContentRenderer blocks={post.content} />
        </article>

        <aside className={styles.sidebar}>

          {/* 目录 */}
          {toc.length > 0 && (
            <div className={styles.sideCard}>
              <div className={styles.sideCardTitle}>📑 目录</div>
              <nav aria-label="文章目录">
                {toc.map((h, i) => (
                  <a
                    key={i}
                    href={`#${h.anchor}`}
                    className={`${styles.tocLink} ${h.level === 3 ? styles.tocLinkSub : ''}`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* 访问记录 */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>
              <EyeOutlined style={{ marginRight: 6 }} />
              访问记录
            </div>

            {/* 统计摘要 */}
            <div className={styles.visitSummary}>
              <div className={styles.visitStat}>
                <span className={styles.visitStatVal}>{visitStats.count}</span>
                <span className={styles.visitStatLabel}>总访问</span>
              </div>
              <div className={styles.visitStat}>
                <span className={styles.visitStatVal}>
                  {visitStats.avgDuration > 0 ? formatDuration(visitStats.avgDuration) : '-'}
                </span>
                <span className={styles.visitStatLabel}>均停留</span>
              </div>
              <div className={styles.visitStat}>
                <span className={styles.visitStatVal}>
                  {visitStats.lastVisitTime ? timeAgo(visitStats.lastVisitTime) : '-'}
                </span>
                <span className={styles.visitStatLabel}>上次访问</span>
              </div>
            </div>

            {/* 最近访问列表 */}
            {visitStats.recentRecords.length > 0 && (
              <div className={styles.visitList}>
                <div className={styles.visitListTitle}>
                  <HistoryOutlined style={{ marginRight: 4 }} />
                  最近记录
                </div>
                {visitStats.recentRecords.map((rec, i) => (
                  <div key={i} className={styles.visitItem}>
                    <span className={styles.visitAvatar}>{rec.username?.[0] ?? '?'}</span>
                    <div className={styles.visitItemInfo}>
                      <span className={styles.visitItemUser}>{rec.username}</span>
                      <span className={styles.visitItemTime}>{timeAgo(rec.timestamp)}</span>
                      {rec.duration > 0 && (
                        <span className={styles.visitItemDur}>停留 {formatDuration(rec.duration)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {visitStats.count === 0 && (
              <p className={styles.visitEmpty}>暂无访问记录</p>
            )}
          </div>

          {/* 相关文章 */}
          {related.length > 0 && (
            <div className={styles.sideCard}>
              <div className={styles.sideCardTitle}>🔗 相关文章</div>
              {related.map((p) => (
                <Link key={p.id} to={`/post/${p.id}`} className={styles.relatedLink}>
                  <span className={styles.relatedTitle}>{p.title}</span>
                  <span className={styles.relatedMeta}>{p.date} · {p.readTime}min</span>
                </Link>
              ))}
            </div>
          )}

        </aside>
      </div>

      {/* 上/下篇导航 */}
      <div className={styles.postNav}>
        {prev ? (
          <Link to={`/post/${prev.id}`} className={`${styles.navCard} ${styles.navPrev}`}>
            <span className={styles.navDir}>← 上一篇</span>
            <span className={styles.navTitle}>{prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/post/${next.id}`} className={`${styles.navCard} ${styles.navNext}`}>
            <span className={styles.navDir}>下一篇 →</span>
            <span className={styles.navTitle}>{next.title}</span>
          </Link>
        ) : <div />}
      </div>

    </div>
  )
}
