import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, message } from 'antd'
import { login, type UserLoginDTO } from '@/api/userApi'
import styles from './index.module.less'

/**
 * 登录页（前端视角示例）：
 * - 调后端 /api/v1/user/login 拿到 JWT
 * - 成功后把 token 放进 localStorage，后续请求由 axios 拦截器自动带上
 */
export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleFinish(values: UserLoginDTO) {
    setLoading(true)
    try {
      const resp = await login(values)
      localStorage.setItem('token', resp.token)
      message.success('登录成功')
      navigate('/') // 简单起见，跳回首页；你也可以跳 /users
    } catch (e: any) {
      message.error(e?.message ?? '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <Card title="登录（JWT 示例）" className={styles.card}>
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

