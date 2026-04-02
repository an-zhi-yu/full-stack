import type { Post } from '../../types'

/**
 * 全栈学习笔记（与 blog-api/docs 下 Markdown 对照）
 * - 业务模块落地步骤 ↔ 业务模块落地步骤.md
 * - JWT ↔ JWT鉴权与Filter规则.md
 * - 问答摘录 ↔ 前端学后端-问答摘录.md
 */
export const javaFullstackLearningPosts: Post[] = [
  {
    id: 'java-jwt-login-auth-practice',
    title: '从前端到后端：JWT 登录与鉴权实战',
    subtitle: '把「账号系统 + JWT + Filter + Axios」串成一条完整链路',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', 'JWT', 'Spring Boot', '全栈', '鉴权'],
    date: '2026-04-02',
    readTime: 15,
    pinned: false,
    content: [
      {
        type: 'paragraph',
        text: '这篇文章以仓库里的 `full-stack/backend/blog-api` 为例，从前端视角把「注册 / 登录 / 携带 token / 后端 Filter / 点赞鉴权」完整串起来。你可以对照前端 `request.ts`、登录页、以及后端的 `UserController`、`UserServiceImpl` 和 `JwtAuthFilter` 一边读一边看源码。',
      },
      { type: 'heading', level: 2, text: '一、整体链路：从表单到 token 再到点赞', anchor: 'flow' },
      {
        type: 'list',
        ordered: true,
        items: [
          '注册：`POST /api/v1/user`，匿名调用；后端校验用户名唯一并用 BCrypt 把密码哈希存到内存 Map（模拟数据库）。',
          '登录：`POST /api/v1/user/login`，成功后返回 `{ token, user }`，前端把 token 存在 localStorage。',
          '携带 token：axios 封装里在每次请求前自动塞上 `Authorization: Bearer <token>`。',
          'Filter 验证：后端全局 `JwtAuthFilter` 拦截需要登录的接口，解析 token 拿到 `uid` / `uname`，放到 `request` 上。',
          '业务接口读 uid：例如文章点赞 `POST /api/v1/posts/{id}/like`，从 `request.getAttribute(\"uid\")` 拿出当前用户 id 写入统计。',
        ],
      },
      { type: 'heading', level: 2, text: '二、哪些接口要登录，哪些可以匿名？', anchor: 'rules' },
      {
        type: 'paragraph',
        text: '这一块逻辑集中在后端的 `JwtAuthFilter` 中，相当于后端的 axios 拦截器。它只处理 `/api/**` 路径，然后根据 URL + HTTP 方法做白名单和鉴权：',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '**完全公开**：注册 `POST /api/v1/user`、登录 `POST /api/v1/user/login`、学习接口 `/api/learn/**`、健康检查 `/api/hello`、`/api/health`。',
          '**文章公开但可带 JWT**：`GET /api/v1/posts` 列表、`GET /api/v1/posts/{id}` 详情（带 token 时用于算 `likedByCurrentUser`）、`POST /api/v1/posts/{id}/view` 浏览上报。',
          '**需登录**：用户相关受保护接口、文章点赞 `POST /api/v1/posts/{id}/like`、后续你加的需要知道当前用户身份的接口。',
        ],
      },
      {
        type: 'tip',
        title: '为什么登录失败不用 401？',
        text: '在本项目里，HTTP 401 主要由 Filter 用来表示「token 问题」（没带、坏了、过期）。如果登录失败你也返回 401，前端 axios 的 401 拦截器会直接清 token 并跳登录，这样登录表单上的「账号密码错误」就和「会话过期」混在一起了。这里登录失败统一走 HTTP 200 + body.code = 400，仅靠 code 判断业务错误。',
      },
      { type: 'heading', level: 2, text: '三、后端几个关键类，换成前端脑袋理解', anchor: 'classes' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**UserEntity vs UserDTO**：Entity 相当于数据库真实表结构（包含 password），UserDTO 是返回给前端看的视图对象（不含 password）。就像你在前端不会把 token 塞进全局用户 Profile 一样。',
          '**UserRegisterDTO / UserLoginDTO / UserUpdateDTO**：对应三个表单的 JSON 形状；配合 `@Valid` + 字段上的 `@NotBlank/@Size`，类似你用 Zod 定义 schema 再 parse 的体验。',
          '**UserService / UserServiceImpl**：接口 + 实现，Controller 只依赖接口；实现里用 `ConcurrentHashMap` 模拟一张用户表，并负责重名检查、密码加密、登录校验等业务规则。',
          '**JwtUtil**：只负责 token 的生成和解析，类似前端用 `jsonwebtoken` 这一类库；密钥和过期时间来自 `application.yml` 里的配置。',
        ],
      },
      { type: 'heading', level: 2, text: '四、前端这边如何配合？', anchor: 'frontend' },
      {
        type: 'list',
        ordered: false,
        items: [
          '封装 axios：在 `request.ts` 里创建实例，统一加上 `Authorization` 头，并在响应拦截里处理 401（清 token、跳 `/login`）。',
          '登录页：有「登录 / 注册」两个 Tab，注册成功后自动帮你调一次登录，把拿到的 token 和 username 写入 localStorage。',
          '点赞按钮：在文章详情页，如果本地没有 token，点击时只弹提示并跳 `/login`；如果有 token，则调用 `POST /api/v1/posts/{id}/like`，根据响应里的 likeCount 和 likedByCurrentUser 更新 UI。',
          '浏览统计：详情页挂载后调用 `POST /api/v1/posts/{id}/view`，把服务端 viewCount 回填到页面上，与本地 useVisitTracker 的数据一起展示。',
        ],
      },
      { type: 'heading', level: 2, text: '五、常见坑与排查思路', anchor: 'pitfalls' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**注册成功一闪又回登录？** 说明注册接口被当成需要 JWT 了，Filter 返回了 401，触发 axios 401 拦截器。修复思路：把 `POST /api/v1/user` 放进 JwtAuthFilter 的白名单。',
          '**为什么明明输错密码也没 401？** 这是有意为之：登录失败用 200 + 业务 code，401 留给「token 问题」。',
          '**record 没有 getXxx()？** Java record 的访问器是 `fieldName()`，所以用 `request.username()` 而不是 `getUsername()`；如果你在 Service 里写错会直接编译报错。',
        ],
      },
      {
        type: 'tip',
        title: '源码与文档入口',
        text: '后端实现细节可以参考 `blog-api` 下的 `UserController.java`、`UserServiceImpl.java`、`JwtAuthFilter.java`，配套文字说明见 `docs/JWT鉴权与Filter规则.md`。',
      },
    ],
  },
  {
    id: 'java-backend-module-layers',
    title: '后端一个模块要拆哪几块？推荐落地顺序',
    subtitle: 'Controller / Service / Repository / DTO / Entity；从前端路由+service 类比',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', 'Spring Boot', '架构', 'REST', '全栈'],
    date: '2026-04-01',
    readTime: 10,
    pinned: false,
    content: [
      {
        type: 'paragraph',
        text: '当你在前端习惯「路由 → 调 API → 更新 store」，在后端落地一个**资源模块**（用户、文章等）时，可以按**契约 → 分层 → 再鉴权**的顺序拆，避免一上来就堆在 Controller 里。',
      },
      { type: 'heading', level: 2, text: '一、先定对外契约', anchor: 'contract' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**URL + 方法**：列表/详情/新建/更新/删除 是否齐全，id 放在路径还是 query。',
          '**JSON 形状**：请求体、响应体字段；**密码是否出现在响应**（一般绝不）。',
          '**HTTP 状态码**：团队用 REST（201/204/404）还是「永远 200 + body.code」。',
        ],
      },
      { type: 'heading', level: 2, text: '二、分层：谁干什么', anchor: 'layers' },
      {
        type: 'table',
        headers: ['层', '职责', '前端类比'],
        rows: [
          ['Controller', '接 HTTP、调 Service、决定状态码', 'Express router handler，保持薄'],
          ['Service', '业务规则、编排、生成 id', '业务 service / 复杂 hook 里的逻辑'],
          ['Repository', '数据存取', '封装 API 或 ORM 的数据层'],
          ['Entity', '内部模型，可含敏感字段', '服务端「真实一行」'],
          ['DTO', '对外传输形状', 'TS 类型 / Zod，对外不含密码'],
        ],
      },
      { type: 'heading', level: 2, text: '三、推荐落地顺序', anchor: 'steps' },
      {
        type: 'list',
        ordered: true,
        items: [
          '定 DTO / Entity（形状先稳）。',
          '写 Repository（内存 Map 或假数据即可）。',
          '写 Service（返回 DTO，脱敏）。',
          '写 Controller（`ApiResult` / `ResponseEntity`）。',
          'MockMvc 测一条主路径。',
          '最后接 JWT / Filter（公开读、登录写）。',
        ],
      },
      {
        type: 'tip',
        title: '仓库对照',
        text: '详细文字版见 **`full-stack/backend/blog-api/docs/业务模块落地步骤.md`**，与本篇同步维护。',
      },
    ],
  },
  {
    id: 'java-jwt-filter-and-axios',
    title: 'JWT 鉴权：Filter、白名单与前端 axios 怎么配合',
    subtitle: 'JwtUtil、JwtAuthFilter、401 与业务错误不要混用',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', 'JWT', 'Spring Boot', '安全', '全栈'],
    date: '2026-04-01',
    readTime: 12,
    pinned: false,
    content: [
      {
        type: 'paragraph',
        text: '可以把 **`JwtAuthFilter`** 想成后端的 **axios 请求拦截器**：在进 Controller 前检查 `Authorization: Bearer`，合法则把 **`uid` / `uname`** 塞进 `request` 的 attribute，后面接口像读 `req.user` 一样用。',
      },
      { type: 'heading', level: 2, text: '一、三条链路', anchor: 'three' },
      {
        type: 'list',
        ordered: true,
        items: [
          '**登录**：校验账号密码 → **`JwtUtil.generateToken`** → 返回 token + 用户信息（无密码）。',
          '**后续请求**：浏览器存 token → axios 拦截器带头 → **Filter 校验** → 设置 `uid`。',
          '**公开接口**：文章列表/详情/浏览上报等 **不要求 token**，规则写在 Filter 里（见源码类注释表格）。',
        ],
      },
      { type: 'heading', level: 2, text: '二、401 和业务错误', anchor: '401' },
      {
        type: 'paragraph',
        text: '**HTTP 401** 常表示「鉴权失败」（没 token、过期、签名错）。前端若对**所有 401** 统一跳转登录，就不要让**注册接口**也返回 401，否则会出现「一闪又回到登录页」。登录密码错误更推荐 **200 + code** 或 **400**，与团队约定一致即可。',
      },
      { type: 'heading', level: 2, text: '三、可选 JWT 的详情 GET', anchor: 'optional' },
      {
        type: 'paragraph',
        text: '文章详情允许匿名阅读；若请求里**带了合法 Bearer**，则解析 `uid`，用于 **`likedByCurrentUser`**。无效 token 可当作匿名，不挡阅读。',
      },
      {
        type: 'tip',
        title: '仓库对照',
        text: '细则见 **`blog-api/docs/JWT鉴权与Filter规则.md`**，代码以 **`JwtAuthFilter.java`** 为准。',
      },
    ],
  },
  {
    id: 'java-frontend-backend-faq-notes',
    title: '前端学后端：常见混淆点速查',
    subtitle: 'Optional、Entity/DTO、StrictMode 双请求、ResponseEntity',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', 'Spring Boot', 'FAQ', '全栈'],
    date: '2026-04-01',
    readTime: 8,
    pinned: false,
    content: [
      {
        type: 'paragraph',
        text: '学习过程中反复出现的问题，浓缩成条目，方便和 **`blog-api`** 对照，而不是背概念。',
      },
      { type: 'heading', level: 2, text: '模型与 API', anchor: 'model' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**Entity 含密码，DTO 不含**；登录请求单独用 LoginDTO。',
          '**MapStruct**：Entity→DTO 减少手写 setter 链。',
          '**PUT + PathVariable + Body**：前端 `put(url+id, json)` 即可。',
        ],
      },
      { type: 'heading', level: 2, text: 'Spring 与 HTTP', anchor: 'http' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**ResponseEntity**：需要 201/204/404 时用；不是多次 JSON 序列化，而是多一层 HTTP 语义。',
          '**@PostConstruct**：Bean 创建后调一次，用于从 classpath 读 JSON 进内存。',
          '**内存 Repository**：重启即丢，和前端临时变量类似。',
        ],
      },
      { type: 'heading', level: 2, text: '前端联调', anchor: 'fe' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**StrictMode** 会导致开发环境请求打两次，可用 **in-flight 去重**。',
          '**Vite proxy** `/api` → 后端，减轻 CORS 烦恼。',
        ],
      },
      {
        type: 'tip',
        title: '完整摘录',
        text: '条目全文见 **`blog-api/docs/前端学后端-问答摘录.md`**，与 **`Java后端新手问答.md`** 互补。',
      },
    ],
  },
]
