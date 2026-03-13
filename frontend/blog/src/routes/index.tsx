/**
 * 应用路由配置
 * - 所有页面使用 lazy + Suspense 实现代码分割（减小首屏体积）
 * - PageTransition 提供统一进入动画
 */
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PageTransition } from '@/components/transition/PageTransition'

// ── 懒加载页面（每个路由独立 chunk） ──────────────────────────
const Home       = lazy(() => import('@/pages/home'))
const Posts      = lazy(() => import('@/pages/posts'))
const PostDetail = lazy(() => import('@/pages/post-detail'))
const Category   = lazy(() => import('@/pages/category'))
const About      = lazy(() => import('@/pages/about'))
const NotFound   = lazy(() => import('@/pages/not-found'))

/** 全屏加载占位（Suspense fallback） */
function Loading() {
  return (
    <div className="page-fallback">
      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>加载中…</span>
    </div>
  )
}

/** 路由出口 */
export function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/"               element={<PageTransition><Home /></PageTransition>} />
        <Route path="/posts"          element={<PageTransition><Posts /></PageTransition>} />
        <Route path="/post/:id"       element={<PageTransition><PostDetail /></PageTransition>} />
        <Route path="/category/:slug" element={<PageTransition><Category /></PageTransition>} />
        <Route path="/about"          element={<PageTransition><About /></PageTransition>} />
        <Route path="/404"            element={<NotFound />} />
        {/* 所有未匹配路由跳转 404 */}
        <Route path="*"               element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
