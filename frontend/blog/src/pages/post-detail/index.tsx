/**
 * 文章详情页（/post/:id）
 * 布局：面包屑 → 文章头 → [正文 + 侧边栏（目录 / 访问记录 / 相关文章）] → 上下篇导航
 * 正文从接口 GET /api/v1/posts/:id 加载；进入后 POST /view 上报浏览；点赞走 POST /like（需登录）
 */
import { useState, useEffect } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { Tag, Tooltip, Spin, Alert, Button, message } from 'antd'
import { EyeOutlined, HistoryOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons'
import { usePostsContext } from '@/contexts/PostsContext'
import { getPostsByCategory } from '@/data/posts/index'
import { ContentRenderer } from '@/components/post/ContentRenderer'
import { useVisitTracker } from '@/hooks/useVisitTracker'
import { usePostDetail } from '@/hooks/usePostDetail'
import { postToggleLike } from '@/api/blogApi'
import { timeAgo, formatDuration } from '@/utils/visitStore'
import styles from './index.module.less'

export default function PostDetail() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { posts } = usePostsContext()
  const { post, loading, error } = usePostDetail(id)

  const visitStats = useVisitTracker(id)

  const [likeBusy, setLikeBusy] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (!post) return
    setLikeCount(post.likeCount ?? 0)
    setLiked(post.likedByCurrentUser ?? false)
  }, [post?.id, post?.likeCount, post?.likedByCurrentUser])

  async function handleLike() {
    if (!localStorage.getItem('token')) {
      message.warning('请先登录再点赞')
      navigate('/login')
      return
    }
    if (!post) return
    setLikeBusy(true)
    try {
      const r = await postToggleLike(post.id)
      setLikeCount(r.likeCount)
      setLiked(r.likedByCurrentUser)
    } catch (e) {
      message.error(e instanceof Error ? e.message : '点赞失败')
    } finally {
      setLikeBusy(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.page} style={{ display: 'flex', justifyContent: 'center', padding: 64 }}>
        <Spin size="large" tip="加载正文…" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.page} style={{ padding: 24 }}>
        <Alert type="error" message={error} showIcon />
      </div>
    )
  }

  if (!post) return <Navigate to="/404" replace />

  const toc = post.content.filter(
    (b): b is Extract<typeof b, { type: 'heading' }> => b.type === 'heading',
  )

  const related = getPostsByCategory(posts, post.categorySlug)
    .filter((p) => p.id !== post.id)
    .slice(0, 4)

  const idx = posts.findIndex((p) => p.id === post.id)
  const prev = idx > 0 ? posts[idx - 1] : null
  const next = idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : null

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
          <span className={styles.metaDot}>·</span>
          <Tooltip title="服务端累计浏览（进入本页会自动上报一次）">
            <span className={styles.metaItem}>
              <EyeOutlined style={{ marginRight: 4 }} />
              浏览 {post.viewCount ?? 0}
            </span>
          </Tooltip>
          <span className={styles.metaDot}>·</span>
          <span className={styles.metaItem}>点赞 {likeCount}</span>
          <Button
            type={liked ? 'primary' : 'default'}
            size="small"
            loading={likeBusy}
            icon={liked ? <LikeFilled /> : <LikeOutlined />}
            onClick={handleLike}
            style={{ marginLeft: 8 }}
          >
            {liked ? '已赞' : '点赞'}
          </Button>
          {visitStats.count > 0 && (
            <>
              <span className={styles.metaDot}>·</span>
              <Tooltip title={`本地记录：平均停留 ${formatDuration(visitStats.avgDuration)}`}>
                <span className={styles.metaItem}>
                  本机访问 {visitStats.count} 次
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

          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>
              <EyeOutlined style={{ marginRight: 6 }} />
              访问记录
            </div>

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
