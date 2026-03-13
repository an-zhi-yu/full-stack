/**
 * 404 页面（/404 或匹配不到的路由）
 */
import { Link } from 'react-router-dom'
import styles from './index.module.less'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.code} aria-hidden="true">404</div>
        <h1 className={styles.title}>页面不存在</h1>
        <p className={styles.desc}>你要找的页面已经溜走了，或者链接有误。</p>
        <Link to="/" className={styles.btn}>← 返回首页</Link>
      </div>
    </div>
  )
}
