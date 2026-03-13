/**
 * 数据层统一出口
 * 业务代码统一从此处导入，不直接引用具体子模块
 *
 * 示例：
 *   import { getPostById, categories } from '@/data'
 */
export { default as allPosts } from './posts/index'
export {
  getPostById,
  getPostsByCategory,
  getPostsByTag,
  getRecentPosts,
  getFeaturedPosts,
  getAllTags,
} from './posts/index'

export { categories } from './categories'
export type { Post, Category, ContentBlock } from './types'
