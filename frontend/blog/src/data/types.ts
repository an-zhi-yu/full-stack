export type ContentBlockType =
  | 'heading'
  | 'paragraph'
  | 'code'
  | 'list'
  | 'tip'
  | 'warning'
  | 'table'
  | 'divider'

export interface HeadingBlock {
  type: 'heading'
  level: 2 | 3
  text: string
  anchor?: string
}
export interface ParagraphBlock {
  type: 'paragraph'
  text: string
}
export interface CodeBlock {
  type: 'code'
  lang: string
  code: string
  caption?: string
}
export interface ListBlock {
  type: 'list'
  ordered?: boolean
  items: string[]
}
export interface TipBlock {
  type: 'tip'
  title?: string
  text: string
}
export interface WarningBlock {
  type: 'warning'
  title?: string
  text: string
}
export interface TableBlock {
  type: 'table'
  headers: string[]
  rows: string[][]
}
export interface DividerBlock {
  type: 'divider'
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | CodeBlock
  | ListBlock
  | TipBlock
  | WarningBlock
  | TableBlock
  | DividerBlock

export interface Post {
  id: string
  title: string
  subtitle: string
  category: string
  categorySlug: string
  tags: string[]
  date: string
  readTime: number
  pinned?: boolean
  content: ContentBlock[]
  /** 后端累计浏览（上报 view 后会更新） */
  viewCount?: number
  /** 后端累计点赞人数 */
  likeCount?: number
  /** 当前登录用户是否已赞（未登录为 false） */
  likedByCurrentUser?: boolean
}

export interface Category {
  slug: string
  name: string
  description: string
  icon: string
  color: string
  postCount?: number
}
