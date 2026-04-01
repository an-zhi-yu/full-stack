import { Switch, Button, Dropdown, MenuProps } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useThemeStore } from '@/store/theme'
import styles from './HeaderBar.module.less'

function readUsername(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('username')
}

const navLinks = [
  { path: '/',      label: '首页' },
  { path: '/posts', label: '文章' },
  { path: '/about', label: '关于' },
]

export function HeaderBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { dark, toggleDark } = useThemeStore()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const username = readUsername()

  const loggedIn = Boolean(token)

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: '退出登录',
      onClick: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/login')
      },
    },
  ]

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
          {loggedIn ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button size="small" type="primary" style={{ marginLeft: 12 }}>
                {username ?? '已登录'}
              </Button>
            </Dropdown>
          ) : (
            <Button
              size="small"
              style={{ marginLeft: 12 }}
              onClick={() => navigate('/login')}
            >
              登录
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
