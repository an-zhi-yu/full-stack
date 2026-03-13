/**
 * 文章列表页（/posts）
 * 功能：展示所有文章，支持按分类筛选、关键词搜索
 */
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Input, Tag, Empty } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import allPosts from '@/data/posts/index'
import { categories } from '@/data/categories'
import styles from './index.module.less'

export default function Posts() {
  // 当前筛选的分类 slug（空字符串 = 全部）
  const [activeSlug, setActiveSlug] = useState('')
  // 搜索关键词
  const [keyword, setKeyword] = useState('')

  /** 按分类 + 关键词过滤后的文章列表 */
  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase()
    return allPosts.filter((p) => {
      const matchCat = !activeSlug || p.categorySlug === activeSlug
      const matchKw  = !kw || p.title.toLowerCase().includes(kw)
                           || p.subtitle.toLowerCase().includes(kw)
                           || p.tags.some((t) => t.toLowerCase().includes(kw))
      return matchCat && matchKw
    })
  }, [activeSlug, keyword])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>所有文章</h1>
        <p className={styles.desc}>共 {filtered.length} 篇 · 持续更新中</p>
      </div>

      {/* 搜索 + 分类过滤 */}
      <div className={styles.toolbar}>
        <Input
          className={styles.search}
          prefix={<SearchOutlined style={{ color: 'rgba(255,255,255,0.3)' }} />}
          placeholder="搜索标题、副标题或标签…"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          allowClear
        />
        <div className={styles.filters}>
          {/* 全部 按钮 */}
          <button
            className={`${styles.filterBtn} ${!activeSlug ? styles.active : ''}`}
            onClick={() => setActiveSlug('')}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              className={`${styles.filterBtn} ${activeSlug === cat.slug ? styles.active : ''}`}
              onClick={() => setActiveSlug(activeSlug === cat.slug ? '' : cat.slug)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 文章卡片网格 */}
      {filtered.length === 0 ? (
        <Empty
          description="暂无匹配文章"
          className={styles.empty}
          imageStyle={{ opacity: 0.4 }}
        />
      ) : (
        <div className={styles.grid}>
          {filtered.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardCat}>{post.category}</span>
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
  )
}
