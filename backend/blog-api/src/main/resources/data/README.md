# `src/main/resources/data/` —— 文章 JSON 数据来源

| 文件 | 用途 |
|------|------|
| **posts-full.json** | 由前端 `frontend/blog` 执行 `npm run export-posts` 生成，**优先**加载；包含当前导出的全部文章。 |
| **sample-posts.json** | 兜底：没有 `posts-full.json` 时使用，仅少量示例。 |

**加载时机**：`PostRepository` 上的 `@PostConstruct` 方法在服务启动后自动执行，读入内存 `Map`，**不会**在运行时写回磁盘。

**修改文章流程**：改前端 TS 数据 → `npm run export-posts` → 重启 `blog-api`。
