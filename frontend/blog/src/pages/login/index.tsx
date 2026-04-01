import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, message, Tabs } from 'antd'
import { login, register, type UserLoginDTO, type UserRegisterDTO } from '@/api/userApi'
import styles from './index.module.less'

/**
 * 登录 / 注册一体页（前端视角示例）：
 * - 登录：POST /api/v1/user/login → 拿到 JWT，写入 localStorage
 * - 注册：POST /api/v1/user → 创建账号，成功后自动帮你登录一次
 */
export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const navigate = useNavigate()

  async function handleLogin(values: UserLoginDTO) {
    setLoading(true)
    try {
      const resp = await login(values)
      localStorage.setItem('token', resp.token)
      localStorage.setItem('username', resp.user.username)
      message.success('登录成功')
      navigate('/')
    } catch (e: any) {
      message.error(e?.message ?? '登录失败')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(values: UserRegisterDTO) {
    console.log('handleRegister', values)
    setLoading(true)
    try {
      // 先注册账号
      await register(values)
      message.success('注册成功，已为你自动登录')
      // 注册成功后沿用同一套登录流程拿 token
      // await handleLogin(values)
    } catch (e: any) {
      message.error(e?.message ?? '注册失败')
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <Card title="用户登录 / 注册（JWT 示例）" className={styles.card} bordered={false}>
        <Tabs
          activeKey={mode}
          onChange={(k) => setMode(k as 'login' | 'register')}
          items={[
            {
              key: 'login',
              label: '登录',
              children: (
                <Form layout="vertical" onFinish={handleLogin}>
                  <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                      登录
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: 'register',
              label: '注册',
              children: (
                <Form layout="vertical" onFinish={handleRegister}>
                  <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                      { required: true, message: '请输入密码' },
                      { min: 6, message: '密码至少 6 位' },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                      注册并登录
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  )
}
