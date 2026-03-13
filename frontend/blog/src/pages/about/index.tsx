/**
 * 关于我页（/about）
 * 作者：安知鱼 - 8年前端开发，正转向全栈 + AI 方向
 */
import { Link } from 'react-router-dom'
import { Tag, Progress } from 'antd'
import styles from './index.module.less'

// ── 技术栈数据 ────────────────────────────────────────────────
/** 前端技术栈（当前主力） */
const frontendSkills = [
  { name: 'Vue 2/3',    pct: 92 },
  { name: 'React',      pct: 85 },
  { name: 'TypeScript', pct: 88 },
  { name: 'Vite',       pct: 82 },
  { name: 'CSS/LESS',   pct: 90 },
]

/** 正在学习的技术 */
const learningSkills = [
  { name: 'Java',       pct: 35 },
  { name: 'Spring Boot',pct: 20 },
  { name: 'Python',     pct: 30 },
  { name: 'Linux',      pct: 40 },
  { name: 'AI 工程',    pct: 25 },
]

/** 工具与工程化标签 */
const toolTags = [
  'Git', 'Docker', 'Nginx', 'Node.js', 'Webpack', 'ESLint',
  'Vitest', 'MySQL', 'Redis', 'VS Code', 'IntelliJ IDEA',
]

/** 博客写作目标 */
const goals = [
  {
    icon: '🚀',
    title: '技能扩展',
    desc: '从纯前端迈向全栈，系统掌握 Java 后端、Python 脚本与 Linux 运维，打通技术全链路。',
  },
  {
    icon: '🤖',
    title: 'AI 时代准备',
    desc: 'AI 大爆发改变了软件开发方式。博客记录用 AI 辅助开发的实践，探索 AI 全栈工程师的成长路径。',
  },
  {
    icon: '📖',
    title: '沉淀与输出',
    desc: '把学习笔记结构化输出，既是对自己的回顾，也希望能帮助到同类型背景的开发者少走弯路。',
  },
  {
    icon: '🌐',
    title: '开放交流',
    desc: '欢迎技术交流，欢迎 PR，代码与内容都将持续更新。每一篇文章都会尽量附上可运行的示例。',
  },
]

export default function About() {
  return (
    <div className={styles.page}>

      {/* ── 个人简介 Hero ── */}
      <section className={styles.hero}>
        {/* 背景光晕 */}
        <div className={styles.heroBg} aria-hidden="true" />

        <div className={styles.heroInner}>
          {/* 头像占位 */}
          <div className={styles.avatar} aria-label="头像">
            <span className={styles.avatarEmoji}>🐟</span>
          </div>

          <div className={styles.heroText}>
            <h1 className={styles.name}>
              安知鱼
              <span className={styles.nameSub}>@anzhiyu</span>
            </h1>
            <p className={styles.role}>8年前端开发 · 全栈进行时</p>
            <p className={styles.bio}>
              做过电商、B端、移动 H5，主栈 Vue + React + TypeScript。
              <br />
              正在向 Java 后端 + AI 工程师方向跨越，这个博客记录这段旅程。
            </p>
            <div className={styles.tagRow}>
              <Tag color="purple">Vue</Tag>
              <Tag color="geekblue">React</Tag>
              <Tag color="blue">TypeScript</Tag>
              <Tag color="orange">Java 学习中</Tag>
              <Tag color="green">AI 探索中</Tag>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.main}>

        {/* ── 博客目标 ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>✍️ 写这个博客的原因</h2>
          <div className={styles.goalGrid}>
            {goals.map((g) => (
              <div key={g.title} className={styles.goalCard}>
                <span className={styles.goalIcon}>{g.icon}</span>
                <div>
                  <div className={styles.goalTitle}>{g.title}</div>
                  <p className={styles.goalDesc}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 技术栈 ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>💻 当前技术栈</h2>
          <div className={styles.skillGrid}>
            {frontendSkills.map((s) => (
              <div key={s.name} className={styles.skillItem}>
                <div className={styles.skillName}>{s.name}</div>
                {/* Ant Design Progress 条 */}
                <Progress
                  percent={s.pct}
                  showInfo={false}
                  strokeColor={{ from: '#6366f1', to: '#a855f7' }}
                  trailColor="rgba(255,255,255,0.08)"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── 正在学习 ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🌱 正在学习</h2>
          <div className={styles.skillGrid}>
            {learningSkills.map((s) => (
              <div key={s.name} className={styles.skillItem}>
                <div className={styles.skillName}>{s.name}</div>
                <Progress
                  percent={s.pct}
                  showInfo={false}
                  strokeColor={{ from: '#22c55e', to: '#3b82f6' }}
                  trailColor="rgba(255,255,255,0.08)"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── 工具与工程化 ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🛠️ 工具与工程化</h2>
          <div className={styles.toolTags}>
            {toolTags.map((t) => (
              <Tag key={t} className={styles.toolTag}>{t}</Tag>
            ))}
          </div>
        </section>

        {/* ── 学习路线 ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🗺️ 2025 年学习路线</h2>
          <div className={styles.roadmap}>
            {[
              { done: true,  label: 'Q1',   title: 'Java 基础',         desc: '语法、OOP、集合框架、异常处理' },
              { done: false, label: 'Q2',   title: 'Java 进阶 + Spring', desc: 'Spring Boot REST API、MyBatis、MySQL' },
              { done: false, label: 'Q3',   title: 'AI 工程入门',        desc: 'Python + OpenAI API / LangChain + RAG' },
              { done: false, label: 'Q4',   title: '全栈项目',           desc: '前后端联调部署，博客上线第一个后端接口' },
            ].map((item) => (
              <div key={item.label} className={`${styles.roadItem} ${item.done ? styles.done : ''}`}>
                <div className={styles.roadDot} />
                <div className={styles.roadContent}>
                  <span className={styles.roadLabel}>{item.label}</span>
                  <div className={styles.roadTitle}>{item.title}</div>
                  <div className={styles.roadDesc}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 底部 CTA ── */}
        <div className={styles.cta}>
          <p>感兴趣就去看看文章吧 →</p>
          <Link to="/posts" className={styles.ctaBtn}>浏览所有文章</Link>
        </div>

      </div>
    </div>
  )
}
