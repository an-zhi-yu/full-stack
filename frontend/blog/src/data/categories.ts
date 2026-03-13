/**
 * 技术分类定义
 * 按「全栈学习路径」组织：前端（已会）→ Java后端 → Python → AI工程 → 运维部署 → 工具效率
 */
import type { Category } from './types'

export const categories: Category[] = [
  {
    slug: 'frontend',
    name: '前端开发',
    description: 'React、Vue、TypeScript、CSS 工程化与性能优化',
    icon: '🌐',
    color: '#6366f1',
  },
  {
    slug: 'java',
    name: 'Java 后端',
    description: 'Java 基础 → OOP → Spring Boot → RESTful API → 微服务',
    icon: '☕',
    color: '#f59e0b',
  },
  {
    slug: 'python',
    name: 'Python',
    description: 'Python 脚本、数据处理、FastAPI 与自动化工具',
    icon: '🐍',
    color: '#3b82f6',
  },
  {
    slug: 'ai',
    name: 'AI 工程',
    description: 'LLM 应用、RAG 检索增强、Prompt 工程与 AI 全栈开发',
    icon: '🤖',
    color: '#ec4899',
  },
  {
    slug: 'devops',
    name: '运维部署',
    description: 'Linux 命令、Docker、Nginx、CI/CD 与云服务器运维',
    icon: '🚀',
    color: '#8b5cf6',
  },
  {
    slug: 'tools',
    name: '工具效率',
    description: 'Git 工作流、IDE 配置、效率工具与开发环境最佳实践',
    icon: '🛠️',
    color: '#10b981',
  },
]
