# 仓库目录与分类说明

## 一、full-stack 下如何划分目录

建议按「技术栈 / 用途」分顶层目录，再在各自下面按「主题或项目」分子目录，避免所有内容堆在一个 `src/` 里。

### 推荐结构（当前与后续）

```
full-stack/
├── java/                    # Java 学习与示例（按主题分子目录）
│   ├── basics/               # 基础：变量、类型、控制流、数组、字符串、数值、对象、Stream
│   │   ├── src/
│   │   ├── out/
│   │   └── README.md
│   ├── (后续可加) collections/   # 集合：List、Map、Set 等
│   ├── (后续可加) io/           # 文件、流、网络等
│   └── (后续可加) concurrency/   # 多线程、并发
│
├── frontend/                 # 前端模块（后续：学习示例或博客前端等）
│   └── (项目名)/
│
├── backend/                  # 后端模块（后续：博客 API、服务等）
│   └── (项目名)/
│
├── docs/                     # 可选：仓库级文档集中放这里
├── JAVA_SETUP.md             # 环境与 Cursor 使用
├── JAVA_CONVENTIONS.md       # Java 规范
├── JAVA_API_CHEATSHEET.md    # 常用 API 速查
├── REPO_STRUCTURE.md         # 本文件：目录划分说明
├── README.md
└── .gitignore
```

### 说明

| 目录 | 用途 | 当前内容 |
|------|------|----------|
| **java/** | 所有 Java 学习与示例 | 按主题分子目录，不再用「HelloWorld」一个名字包住全部 |
| **java/basics/** | 入门与基础 API | 原 HelloWorld 内容（Main、Run、BasicsDemo、ArrayDemo、StringDemo、NumberDemo、ObjectDemo） |
| **frontend/** | 前端项目/示例 | 预留，后续放 Vue/React 等 |
| **backend/** | 后端项目/示例 | 预留，后续放 Spring/Node 等 |
| 根目录 | 文档、规范、配置 | JAVA_*.md、REPO_STRUCTURE.md、.gitignore |

---

## 二、为什么不用 HelloWorld 这个名字？

- **HelloWorld** 一般指「第一个能跑起来的小程序」，适合只放一个 Main。
- 你现在已经有：入口、控制流、数组、字符串、数值、对象、Stream 等多类示例，更合适叫 **Java 基础**，所以改为 **java/basics**。以后 Java 内容增多，可以继续在 **java/** 下加 **collections/**、**io/** 等，每个子目录一个主题、各自一个 `src/`，结构清晰。

---

## 三、博客前后端放哪里？

和之前建议一致：**同一仓库、用目录区分**。

- 博客前端 → **frontend/blog**（或 **frontend/xxx-blog**）
- 博客后端 → **backend/blog-api**（或 **backend/xxx-service**）

这样一次 clone，前后端都在，版本也容易对应。详见本仓库之前「博客后台 + 前端：放一起还是分仓库」的说明。

---

## 四、小结

- **java/basics**：当前 Java 入门与常用 API 示例（原 HelloWorld 内容），名字更贴切，且为后续 **java/xxx** 留出空间。
- **java/** 下按主题分子目录，每个主题自己的 `src/`，避免全挤在一个 src 里。
- **frontend/**、**backend/** 预留，后续按项目再建子目录即可。
