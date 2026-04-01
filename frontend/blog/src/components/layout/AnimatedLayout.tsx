import type { ReactNode } from 'react'
import { HeaderBar } from './HeaderBar.tsx'
import styles from './AnimatedLayout.module.less'
import { useLocation } from 'react-router-dom'

interface AnimatedLayoutProps {
  children: ReactNode
}

/** 顶部导航 + 内容区布局 */
export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const location = useLocation()
  return (
    <div className={styles.layout}>
      {location.pathname !== '/login' ? <HeaderBar /> : null}
      <main className={styles.content}>{children}</main>
    </div>
  )
}
