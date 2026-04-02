# JWT 鉴权：在本项目里怎么接上的（前端对照）

## 1. 整体像什么

- **签发 token**：登录成功后，后端用 **`JwtUtil`** 根据 `userId`、`username` 生成 JWT 字符串。  
- **前端携带**：浏览器把 token 存 `localStorage`，axios **`Authorization: Bearer <token>`** 自动带上（见前端 `request.ts`）。  
- **后端校验**：**`JwtAuthFilter`**（`OncePerRequestFilter`）在进 Controller 之前解析 token，把 **`uid` / `uname`** 放进 **`HttpServletRequest` 的 attribute**，后面 Controller 里 `request.getAttribute("uid")` 即可。

类比：Express **全局中间件**里 `verifyJWT(req, res, next)`，通过后 `req.user = payload`。

---

## 2. 为什么不是「所有接口都要 token」

博客场景里常见需求：

- **文章列表 / 详情 / 浏览上报**：允许匿名，首页才能不登录打开。  
- **点赞**：需要知道「当前用户是谁」，必须登录。  
- **注册 / 登录**：当然不能要求已有 token。

所以过滤器里要维护 **「白名单 + 特殊规则」**，而不是简单 `if (!token) 401`。

本仓库当前规则（以源码 **`JwtAuthFilter.java`** 顶部注释为准）概要：

- **完全不要 JWT**：注册 `POST /api/v1/user`、登录 `POST /api/v1/user/login`、学习与健康检查、文章列表、文章浏览 `POST .../view`、教学用新建文章 `POST /api/v1/posts` 等。  
- **GET 文章详情**：**可选 JWT**——没带 token 也能读文；带了合法 token 则解析 `uid`，用于 **`likedByCurrentUser`**。  
- **其余 `/api/**`**：必须合法 Bearer，否则 **HTTP 401** + `ApiResult` 风格 body。

---

## 3. HTTP 401 和业务里的「密码错误」

- **401**：在本项目里主要由 **Filter** 返回——**没 token、token 坏了、过期**。  
- **登录密码错误**：`UserController.login` 里用 **`ApiResult.fail(401, "用户名或密码错误")`** 等业务码也可以，但要注意：**前端 axios 对 HTTP 401 往往会清 token 并跳转登录页**。  
- 更干净的做法（团队常选）：登录失败返回 **HTTP 200 + body.code ≠ 0**，或 **400 + 明确 message**，**401 只留给鉴权**；本案例为演示混用过，联调时要心里有数。

---

## 4. 前端为何「注册一闪又回到登录」

若 **注册接口被过滤器当成需鉴权**，会先得到 **HTTP 401**，axios 拦截器清 token 并 **`window.location.href = '/login'`**，看起来像「闪一下」。  
修复方式：**把 `POST /api/v1/user` 放进公开路径**（已在 `JwtAuthFilter` 中处理）。

---

## 5. 相关文件速查

| 文件 | 作用 |
|------|------|
| `common/util/JwtUtil.java` | 生成 / 解析 JWT |
| `config/JwtProperties.java` + `application.yml` | 密钥、过期时间 |
| `config/JwtAuthFilter.java` | 路径规则 + 401 |
| `config/JwtConfig.java` | 注册 Filter |
| `controller/UserController.java` | 登录成功时 `generateToken` |
