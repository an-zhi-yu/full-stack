/**
 * 内容块渲染器
 * 支持类型：heading / paragraph / code / list / tip / warning / table / divider
 *
 * 代码高亮：使用 highlight.js 按需加载语言（Java/TS/JS/Python/Bash/SQL）
 * 代码块始终保持深色背景，亮色主题下同样可读
 */
import { useMemo } from 'react'
import hljs from 'highlight.js/lib/core'
// ── 按需注册语言，减小 bundle ──────────────────────────────────
import java       from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python     from 'highlight.js/lib/languages/python'
import bash       from 'highlight.js/lib/languages/bash'
import sql        from 'highlight.js/lib/languages/sql'
import xml        from 'highlight.js/lib/languages/xml'
// 代码块配色（深色主题，适合两种主题下的深色代码块背景）
import 'highlight.js/styles/github-dark.min.css'

import type { ContentBlock } from '@/data/types'
import styles from './ContentRenderer.module.less'

hljs.registerLanguage('java',       java)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js',         javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts',         typescript)
hljs.registerLanguage('python',     python)
hljs.registerLanguage('py',         python)
hljs.registerLanguage('bash',       bash)
hljs.registerLanguage('sh',         bash)
hljs.registerLanguage('sql',        sql)
hljs.registerLanguage('xml',        xml)
hljs.registerLanguage('html',       xml)

interface Props {
  blocks: ContentBlock[]
}

/** 将 block.lang 归一化为 hljs 能识别的语言名称 */
function normalizeLang(lang?: string): string {
  if (!lang) return 'plaintext'
  return lang.toLowerCase()
}

/**
 * 对单个代码字符串做语法高亮
 * 返回 hljs 生成的 HTML 字符串
 */
function highlight(code: string, lang: string): string {
  try {
    const result = hljs.highlight(code, { language: lang, ignoreIllegals: true })
    return result.value
  } catch {
    // 未注册的语言降级为纯文本
    return hljs.highlightAuto(code).value
  }
}

/**
 * 把行内的 `code` 转为 <code> 标签，** 转粗体
 * 用于 paragraph / list / callout / table 的文本格式化
 */
function formatInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}

/** 单个代码块子组件，内部 useMemo 缓存高亮结果 */
function CodeBlock({ block }: { block: Extract<ContentBlock, { type: 'code' }> }) {
  const lang = normalizeLang(block.lang)

  // 只要 code + lang 不变就复用高亮结果
  const highlighted = useMemo(() => highlight(block.code, lang), [block.code, lang])

  return (
    <div className={styles.codeBlock}>
      {block.caption && (
        <div className={styles.codeCaption}>
          <span className={styles.codeLang}>{block.lang}</span>
          <span>{block.caption}</span>
        </div>
      )}
      <pre className={styles.pre}>
        {/* highlight.js 输出的 HTML 直接注入，包含 <span class="hljs-xxx"> 标签 */}
        <code
          className={`${styles.code} hljs language-${lang}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  )
}

export function ContentRenderer({ blocks }: Props) {
  return (
    <div className={styles.content}>
      {blocks.map((block, i) => {
        switch (block.type) {

          // 二级标题（带锚点供目录跳转）
          case 'heading':
            return block.level === 2 ? (
              <h2 key={i} id={block.anchor} className={styles.h2}>{block.text}</h2>
            ) : (
              <h3 key={i} id={block.anchor} className={styles.h3}>{block.text}</h3>
            )

          // 段落（支持行内 code 和 **bold**）
          case 'paragraph':
            return (
              <p
                key={i}
                className={styles.p}
                dangerouslySetInnerHTML={{ __html: formatInline(block.text) }}
              />
            )

          // 代码块（highlight.js 高亮）
          case 'code':
            return <CodeBlock key={i} block={block} />

          // 有序 / 无序列表
          case 'list':
            return block.ordered ? (
              <ol key={i} className={styles.list}>
                {block.items.map((item, j) => (
                  <li key={j} className={styles.li} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                ))}
              </ol>
            ) : (
              <ul key={i} className={styles.list}>
                {block.items.map((item, j) => (
                  <li key={j} className={styles.li} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                ))}
              </ul>
            )

          // 提示框（蓝紫色）
          case 'tip':
            return (
              <div key={i} className={`${styles.callout} ${styles.calloutTip}`}>
                <div className={styles.calloutTitle}>
                  <span>💡</span>
                  {block.title ?? '提示'}
                </div>
                <p className={styles.calloutText} dangerouslySetInnerHTML={{ __html: formatInline(block.text) }} />
              </div>
            )

          // 警告框（琥珀色）
          case 'warning':
            return (
              <div key={i} className={`${styles.callout} ${styles.calloutWarn}`}>
                <div className={styles.calloutTitle}>
                  <span>⚠️</span>
                  {block.title ?? '注意'}
                </div>
                <p className={styles.calloutText} dangerouslySetInnerHTML={{ __html: formatInline(block.text) }} />
              </div>
            )

          // 数据表格（条纹行）
          case 'table':
            return (
              <div key={i} className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {block.headers.map((h, j) => (
                        <th key={j} className={styles.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className={styles.tr}>
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={styles.td}
                            dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          // 分割线
          case 'divider':
            return <hr key={i} className={styles.hr} />

          default:
            return null
        }
      })}
    </div>
  )
}
