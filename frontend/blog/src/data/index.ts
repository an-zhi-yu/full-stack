/**
 * 数据层统一出口
 *
 * 文章列表来自接口：使用 PostsProvider + usePostsContext（见 App.tsx）
 */
export {
  getPostById,
  getPostsByCategory,
  getPostsByTag,
  getRecentPosts,
  getFeaturedPosts,
  getAllTags,
  sortPostsByDateDesc,
} from './posts/index'

export { PostsProvider, usePostsContext } from '@/contexts/PostsContext'

export { categories } from './categories'
export type { Post, Category, ContentBlock } from './types'
