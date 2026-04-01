import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Table } from 'antd'
import { getUsers, type UserDTO } from '@/api/userApi'

/**
 * 用户列表页：演示「受 JWT 保护的接口」在前端怎么调用。
 * - 进入页面时请求 GET /api/v1/user
 * - 若 token 缺失 / 过期，后端返回 401，axios 拦截器会清 token 并跳转 /login
 */
export default function UsersPage() {
  const [users, setUsers] = useState<UserDTO[]>([])

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error)
  }, [])

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '用户名', dataIndex: 'username' },
    {
      title: '操作',
      render: (_: unknown, record: UserDTO) => <Link to={`/users/${record.id}`}>查看</Link>,
    },
  ]

  return (
    <Card title="用户列表（需要先登录拿到 JWT）">
      <Table rowKey="id" dataSource={users} columns={columns} pagination={false} />
    </Card>
  )
}

