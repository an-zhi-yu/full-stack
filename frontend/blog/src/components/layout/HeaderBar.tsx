import { Switch } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { useThemeStore } from '@/store/theme'
import styles from './HeaderBar.module.less'

const navLinks = [
  { path: '/',      label: '首页' },
  { path: '/posts', label: '文章' },
  { path: '/about', label: '关于' },
]

export function HeaderBar() {
  const location = useLocation()
  const { dark, toggleDark } = useThemeStore()

  function isActive(path: string) {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⌘</span>
          <span className={styles.logoText}>Dev Notes</span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`${styles.navLink} ${isActive(path) ? styles.navActive : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.extra}>
          <span className={styles.themeLabel}>{dark ? '🌙' : '☀️'}</span>
          <Switch checked={dark} onChange={toggleDark} size="small" />
        </div>
      </div>
    </header>
  )
}
