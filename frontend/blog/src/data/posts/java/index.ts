/**
 * Java 系列文章聚合（当前 19 篇）
 *
 * 按主题拆分模块，新增时请改到对应文件，避免单文件无限膨胀：
 * - fundamentals.ts — 变量～方法（语法基础）
 * - oop.ts — Override～异常（面向对象与 API）
 * - maven.ts — Maven 与 Gson 依赖
 * - engineering.ts — 规范、目录结构、新手坑
 * - review.ts — 学习路径复盘
 * - spring-boot.ts — Spring Boot 案例导读（blog-api）
 */
import type { Post } from '../../types'
import { javaEngineeringPosts } from './engineering'
import { javaFundamentalsPosts } from './fundamentals'
import { javaMavenPosts } from './maven'
import { javaOopPosts } from './oop'
import { javaReviewPosts } from './review'
import { javaSpringBootPosts } from './spring-boot'

const javaPosts: Post[] = [
  ...javaFundamentalsPosts,
  ...javaOopPosts,
  ...javaMavenPosts,
  ...javaEngineeringPosts,
  ...javaReviewPosts,
  ...javaSpringBootPosts,
]

export default javaPosts
