import type { Category } from './types'

export const categories: Category[] = [
  {
    slug: 'java',
    name: 'Java',
    description: '从零掌握 Java 基础语法、OOP 与常用 API',
    icon: '☕',
    color: '#f59e0b',
  },
  {
    slug: 'frontend',
    name: '前端',
    description: 'React、TypeScript、工程化与 UI 实战',
    icon: '🌐',
    color: '#6366f1',
  },
  {
    slug: 'backend',
    name: '后端',
    description: 'Spring Boot、API 设计与数据库',
    icon: '⚙️',
    color: '#22c55e',
  },
  {
    slug: 'python',
    name: 'Python',
    description: '脚本、数据处理与 FastAPI 实践',
    icon: '🐍',
    color: '#3b82f6',
  },
  {
    slug: 'linux',
    name: 'Linux',
    description: '常用命令、Shell 脚本与服务器运维',
    icon: '🐧',
    color: '#8b5cf6',
  },
  {
    slug: 'tools',
    name: '工具与效率',
    description: 'Git、Docker、IDE 配置与效率技巧',
    icon: '🛠️',
    color: '#ec4899',
  },
]
