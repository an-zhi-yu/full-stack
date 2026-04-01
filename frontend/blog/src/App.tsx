import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useThemeStore } from '@/store/theme'
import { getThemeConfig } from '@/styles/theme'
import { AnimatedLayout } from '@/components/layout/AnimatedLayout'
import { PostsProvider } from '@/contexts/PostsContext'
import { AppRoutes } from '@/routes'

/**
 * 应用根组件
 * - 监听主题状态，同步给 <html data-theme> 属性
 *   → global.less 中 [data-theme="light"] 覆盖 CSS 变量，实现全局切换
 * - ConfigProvider 同步切换 Ant Design token（亮/暗 algorithm）
 */
function App() {
  const dark = useThemeStore((s) => s.dark)

  // 主题切换核心：把 data-theme 写到 <html>，global.less 中的 CSS 变量随之切换
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ConfigProvider locale={zhCN} theme={getThemeConfig(dark)}>
      <BrowserRouter>
        <PostsProvider>
          <AnimatedLayout>
            <AppRoutes />
          </AnimatedLayout>
        </PostsProvider>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
