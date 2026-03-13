/**
 * 首页（Home）
 * 布局：Hero → Stats → 精选文章 → 技术分类 → 最新文章 → 数据看板
 * 数据全部来自静态数据层 @/data
 */
import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Tag, Spin } from 'antd'
import { categories } from '@/data/categories'
import { getRecentPosts, getFeaturedPosts } from '@/data/posts/index'
import styles from './index.module.less'

// @ant-design/plots 体积较大（~1.5MB），懒加载以拆包，避免影响首屏速度
const DashboardCharts = lazy(() =>
  import('./components/DashboardCharts').then((m) => ({ default: m.DashboardCharts }))
)

// ── 静态数据 ──────────────────────────────────────────────────
const recentPosts  = getRecentPosts(6)
const featuredPosts = getFeaturedPosts()

/** 标签名 → Ant Design Tag 颜色映射 */
const tagColorMap: Record<string, string> = {
  Java: 'orange', Arrays: 'gold', Stream: 'geekblue',
  OOP: 'purple', 字符串: 'cyan', 数值: 'volcano',
  基础入门: 'blue', static: 'green', 工具类: 'lime',
}

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ────────────────── Hero ────────────────── */}
      <section className={styles.hero}>
        {/* 背景浮动光球，通过 CSS keyframe floatBlob 驱动 */}
        <div className={styles.blobs} aria-hidden="true">
          <span className={`${styles.blob} ${styles.blob1}`} />
          <span className={`${styles.blob} ${styles.blob2}`} />
          <span className={`${styles.blob} ${styles.blob3}`} />
        </div>

        <div className={styles.heroInner}>
          <span className={styles.badge}>全栈学习笔记</span>

          <h1 className={styles.heroTitle}>
            记录技术成长
            <br />
            {/* gradientText 类使用 background-clip: text 实现渐变字 */}
            <span className={styles.gradientText}>分享学习心得</span>
          </h1>

          <p className={styles.heroSub}>
            Java · 前端 · 后端 · Python · Linux
            <br />
            系统整理，持续更新，欢迎一起成长
          </p>

          <div className={styles.heroCtas}>
            <Link to="/posts" className={styles.ctaPrimary}>浏览所有文章</Link>
            <Link to="/about" className={styles.ctaSecondary}>关于我</Link>
          </div>
        </div>
      </section>

      {/* ────────────────── 统计栏 ────────────────── */}
      <section className={styles.stats} aria-label="统计数据">
        {[
          { val: String(recentPosts.length), label: '已发布文章' },
          { val: String(categories.length),  label: '技术分类' },
          { val: '7',  label: 'Java 系列' },
          { val: '∞',  label: '持续更新' },
        ].map((s, i) => (
          <div key={i} className={styles.statItem}>
            <span className={styles.statVal}>{s.val}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ────────────────── 主体内容 ────────────────── */}
      <div className={styles.main}>

        {/* 精选文章 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>📌 精选文章</h2>
            <Link to="/posts" className={styles.more}>查看全部 →</Link>
          </div>
          <div className={styles.featuredGrid}>
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className={styles.featuredCard}
              >
                <div className={styles.cardCategory}>{post.category}</div>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardSub}>{post.subtitle}</p>
                <div className={styles.cardMeta}>
                  <span>{post.date}</span>
                  <span>{post.readTime} min read</span>
                </div>
                <div className={styles.cardTags}>
                  {post.tags.slice(0, 3).map((t) => (
                    <Tag key={t} color={tagColorMap[t] ?? 'default'} className={styles.tag}>
                      {t}
                    </Tag>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 技术分类 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>📚 技术分类</h2>
          </div>
          <div className={styles.catGrid}>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className={styles.catCard}
                // CSS 变量传入，让每个分类卡片拥有独立主题色
                style={{ '--cat-color': cat.color } as React.CSSProperties}
              >
                <span className={styles.catIcon}>{cat.icon}</span>
                <div>
                  <div className={styles.catName}>{cat.name}</div>
                  <div className={styles.catDesc}>{cat.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 最新文章列表 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>🆕 最新文章</h2>
            <Link to="/posts" className={styles.more}>查看全部 →</Link>
          </div>
          <div className={styles.postList}>
            {recentPosts.map((post, i) => (
              <Link key={post.id} to={`/post/${post.id}`} className={styles.postItem}>
                {/* 序号 */}
                <span className={styles.postIndex}>0{i + 1}</span>
                {/* 标题 + 副标题 + meta */}
                <div className={styles.postInfo}>
                  <div className={styles.postTitle}>{post.title}</div>
                  <div className={styles.postSub}>{post.subtitle}</div>
                  <div className={styles.postMeta}>
                    <span className={styles.postCat}>{post.category}</span>
                    <span className={styles.dot}>·</span>
                    <span>{post.date}</span>
                    <span className={styles.dot}>·</span>
                    <span>{post.readTime} min</span>
                  </div>
                </div>
                {/* 悬停箭头 */}
                <span className={styles.postArrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 数据看板 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>📈 数据看板</h2>
          </div>
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px 0' }}><Spin /></div>}>
            <DashboardCharts />
          </Suspense>
        </section>

      </div>
    </div>
  )
}
