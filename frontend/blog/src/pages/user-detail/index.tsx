import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Descriptions } from 'antd'
import { getUserById, type UserDTO } from '@/api/userApi'

/**
 * 用户详情页：按 id 调用 GET /api/v1/user/{id}
 */
export default function UserDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const [user, setUser] = useState<UserDTO | null>(null)

  useEffect(() => {
    if (!id) return
    getUserById(id)
      .then(setUser)
      .catch(console.error)
  }, [id])

  if (!user) return null

  return (
    <Card title={`用户：${user.username}`}>
      <Descriptions column={1}>
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

