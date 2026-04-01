# 博客文章 REST API 约定（与前端 `Post` 形状对齐）

资源名用**复数** `posts`，版本前缀 **`/api/v1`**，与「学习用」`/api/learn` 区分开。

统一响应外壳仍为 **`ApiResult<T>`**；**资源不存在时 HTTP 状态码为 404**（body 内仍有 `code/message` 便于前端统一处理）。

---

## 1. URL 与动词（标准 CRUD）

| 意图 | HTTP 方法 | URL | 说明 |
|------|-----------|-----|------|
| **列表** | `GET` | `/api/v1/posts` | 可选查询参数筛选 |
| **详情** | `GET` | `/api/v1/posts/{id}` | `{id}` 为文章 slug，如 `java-spring-boot-blog-api` |
| **新增** | `POST` | `/api/v1/posts` | Body JSON，**无 `id`** 或由服务端生成 |
| **全量替换** | `PUT` | `/api/v1/posts/{id}` | Body 为完整文章 JSON |
| **删除** | `DELETE` | `/api/v1/posts/{id}` | 成功返回 `204 No Content`（无 body）或 `200` + 提示，本项目用 **204** |

### 查询参数（列表）

| 参数 | 示例 | 说明 |
|------|------|------|
| `categorySlug` | `?categorySlug=java` | 按分类筛选 |
| （扩展）`tag` / `page` / `size` | 预留分页、标签过滤 | 当前示例实现支持 `categorySlug` |

---

## 2. 与前端 `Post` 类型的字段对应

| 字段 | 类型 | 列表接口是否返回 |
|------|------|------------------|
| `id` | string | ✓ |
| `title` | string | ✓ |
| `subtitle` | string | ✓ |
| `category` | string | 详情 ✓；列表可省略或精简 |
| `categorySlug` | string | ✓ |
| `tags` | string[] | ✓ |
| `date` | string (YYYY-MM-DD) | ✓ |
| `readTime` | number | ✓ |
| `pinned` | boolean? | ✓ |
| `content` | ContentBlock[] | **仅详情**；列表不返回以减小体积 |

---

## 3. 示例请求

**列表：**

```http
GET http://localhost:8080/api/v1/posts
GET http://localhost:8080/api/v1/posts?categorySlug=java
```

**详情：**

```http
GET http://localhost:8080/api/v1/posts/java-spring-boot-blog-api
```

**新增：**

```http
POST http://localhost:8080/api/v1/posts
Content-Type: application/json

{
  "title": "新文章",
  "subtitle": "副标题",
  "category": "Java 后端",
  "categorySlug": "java",
  "tags": ["Java"],
  "date": "2026-03-25",
  "readTime": 5,
  "pinned": false,
  "content": [{ "type": "paragraph", "text": "正文" }]
}
```

**替换：**

```http
PUT http://localhost:8080/api/v1/posts/{id}
Content-Type: application/json
```

**删除：**

```http
DELETE http://localhost:8080/api/v1/posts/{id}
```

---

## 4. 数据从哪来？

本仓库在 **`src/main/resources/data/sample-posts.json`** 内置**与现有博客 id 对齐的示例数据**（正文为摘要级，完整长文仍可在前端静态数据中维护）。  
服务启动时载入内存；`POST/PUT/DELETE` 在**当前进程内**生效，重启后除 JSON 初始数据外**不持久化**（学习用；生产需接数据库）。

实现类：`PostController`、`PostService`、`PostRepository`。
