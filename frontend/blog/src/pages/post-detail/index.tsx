/**
 * 文章详情页（/post/:id）
 * 布局：面包屑 → 文章头 → [正文 + 侧边栏（目录 / 相关文章）] → 上下篇导航
 */
import { useParams, Link, Navigate } from 'react-router-dom'
import { Tag } from 'antd'
import { getPostById } from '@/data/posts/index'
import { getPostsByCategory } from '@/data/posts/index'
import allPosts from '@/data/posts/index'
import { ContentRenderer } from '@/components/post/ContentRenderer'
import styles from './index.module.less'

export default function PostDetail() {
  const { id = '' } = useParams<{ id: string }>()
  const post = getPostById(id)

  // 文章不存在时跳转 404
  if (!post) return <Navigate to="/404" replace />

  // ── 侧边栏数据 ────────────────────────────────────────────
  // 目录：从内容块中提取 heading 类型
  const toc = post.content.filter(
    (b): b is Extract<typeof b, { type: 'heading' }> => b.type === 'heading',
  )

  // 相关文章：同分类、排除自身、最多 4 篇
  const related = getPostsByCategory(post.categorySlug)
    .filter((p) => p.id !== post.id)
    .slice(0, 4)

  // 上一篇 / 下一篇（按原始数组顺序）
  const idx  = allPosts.findIndex((p) => p.id === post.id)
  const prev = idx > 0                  ? allPosts[idx - 1] : null
  const next = idx < allPosts.length - 1 ? allPosts[idx + 1] : null

  return (
    <div className={styles.page}>

      {/* 面包屑导航 */}
      <nav className={styles.breadcrumb} aria-label="面包屑">
        <Link to="/" className={styles.breadLink}>首页</Link>
        <span className={styles.breadSep}>›</span>
        <Link to={`/category/${post.categorySlug}`} className={styles.breadLink}>
          {post.category}
        </Link>
        <span className={styles.breadSep}>›</span>
        <span className={styles.breadCurrent}>{post.title}</span>
      </nav>

      {/* 文章头部 */}
      <header className={styles.header}>
        <div className={styles.categoryBadge}>{post.category}</div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.subtitle}>{post.subtitle}</p>

        {/* 元信息 */}
        <div className={styles.meta}>
          <span className={styles.metaItem}>📅 {post.date}</span>
          <span className={styles.metaDot}>·</span>
          <span className={styles.metaItem}>⏱ {post.readTime} min read</span>
        </div>

        {/* 标签 */}
        <div className={styles.tags}>
          {post.tags.map((t) => (
            <Tag key={t} className={styles.tag}>{t}</Tag>
          ))}
        </div>
      </header>

      {/* 正文 + 侧边栏 */}
      <div className={styles.layout}>

        {/* 正文 */}
        <article className={styles.article}>
          <ContentRenderer blocks={post.content} />
        </article>

        {/* 侧边栏 */}
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

      {/* 上一篇 / 下一篇 */}
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
