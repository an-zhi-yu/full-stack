import { ReactNode } from 'react'
import styles from './PageTransition.module.less'

interface PageTransitionProps {
  children: ReactNode
}

/** 页面切换时统一应用进入动画 */
export function PageTransition({ children }: PageTransitionProps) {
  return <div className={styles.wrapper}>{children}</div>
}
