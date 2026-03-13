import type { ReactNode } from 'react'
import { HeaderBar } from './HeaderBar.tsx'
import styles from './AnimatedLayout.module.less'

interface AnimatedLayoutProps {
  children: ReactNode
}

/** 顶部导航 + 内容区布局 */
export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  return (
    <div className={styles.layout}>
      <HeaderBar />
      <main className={styles.content}>{children}</main>
    </div>
  )
}
