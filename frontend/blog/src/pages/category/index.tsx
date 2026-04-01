/**
 * 分类页（/category/:slug）
 * 展示某个分类下的所有文章
 */
import { useParams, Link, Navigate } from 'react-router-dom'
import { Tag } from 'antd'
import { categories } from '@/data/categories'
import { usePostsContext } from '@/contexts/PostsContext'
import { getPostsByCategory } from '@/data/posts/index'
import styles from './index.module.less'

export default function Category() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { posts: allPosts } = usePostsContext()

  // 查找分类信息，不存在则重定向到 404
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) return <Navigate to="/404" replace />

  const posts = getPostsByCategory(allPosts, slug)

  return (
    <div className={styles.page}>
      {/* 分类头部 */}
      <div className={styles.catHeader} style={{ '--cat-color': cat.color } as React.CSSProperties}>
        <div className={styles.catHeaderInner}>
          <span className={styles.catIcon}>{cat.icon}</span>
          <div>
            <h1 className={styles.catName}>{cat.name}</h1>
            <p className={styles.catDesc}>{cat.description}</p>
            <span className={styles.catCount}>{posts.length} 篇文章</span>
          </div>
        </div>
      </div>

      {/* 文章列表 */}
      <div className={styles.content}>
        {posts.length === 0 ? (
          <div className={styles.empty}>
            <p>该分类暂无文章，敬请期待 👀</p>
            <Link to="/posts" className={styles.backLink}>← 返回所有文章</Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <Link key={post.id} to={`/post/${post.id}`} className={styles.card}>
                <div className={styles.cardTop}>
                  {post.pinned && <span className={styles.pin}>📌 精选</span>}
                </div>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardSub}>{post.subtitle}</p>
                <div className={styles.cardTags}>
                  {post.tags.slice(0, 4).map((t) => (
                    <Tag key={t} className={styles.tag}>{t}</Tag>
                  ))}
                </div>
                <div className={styles.cardMeta}>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
