# 前端学后端：GET / POST(JSON) / YAML 配置 / 跨域

对照仓库代码：`FrontendLearningController`、`AppDemoProperties`、`application*.yml`、`WebMvcConfig`。

---

## 1. 最简 GET：`/api/learn/ping`

| 方式 | 操作 |
|------|------|
| **浏览器** | 地址栏输入：`http://localhost:8080/api/learn/ping` 回车（GET 无请求体） |
| **Postman** | Method 选 **GET**，URL 同上，点 Send |
| **curl** | `curl http://localhost:8080/api/learn/ping` |

响应为统一壳子 + `data`：

```json
{"code":0,"message":"ok","data":"pong"}
```

---

## 2. POST JSON Echo：`/api/learn/echo` + `fetch`

后端要求：**方法 POST**、**头 `Content-Type: application/json`**、**body 为 JSON**。

### 2.1 浏览器里直接调（页面跑在 Vite 上）

```javascript
// 假设前端在 http://localhost:5173，后端在 8080 → 不同源，依赖 CORS
const res = await fetch('http://localhost:8080/api/learn/echo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // 必须：否则 Spring 可能 415
  },
  body: JSON.stringify({ name: '张三', note: 'hello' }),
})
const json = await res.json()
console.log(json) // { code, message, data: { name, note } }
```

### 2.2 跨域（CORS）你在前端会踩什么坑？

- **同源**：协议 + 域名 + 端口全相同。`localhost:5173` 与 `localhost:8080` **端口不同 → 不同源**。
- 浏览器会先发 **OPTIONS 预检**（复杂请求时），后端必须返回允许的来源与方法。本项目在 `WebMvcConfig` 里已对 `/api/**` 配置了 `localhost` / `127.0.0.1` 的通配端口。
- **若仍报错**：检查是否用了 `file://` 打开 HTML、是否走了公司代理、或前端端口不在 `localhost`（例如局域网 IP）——需把对应 origin 加进 `allowedOriginPatterns`，或开发时用 **Vite 代理**（见下）。

### 2.3 用 Vite 代理绕开浏览器 CORS（另一种常见做法）

`vite.config.ts`：

```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
})
```

前端改请求同一源：

```javascript
await fetch('/api/learn/echo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '张三', note: 'hello' }),
})
```

此时浏览器认为请求发往 `5173`，由 Vite 转发到 `8080`，**不触发浏览器 CORS**。

### 2.4 Postman

- Method：**POST**
- URL：`http://localhost:8080/api/learn/echo`
- Body → **raw** → **JSON**：

```json
{"name":"张三","note":"hello"}
```

Postman **不受浏览器 CORS 限制**；若 Postman 通、浏览器不通，基本就是 CORS 或 URL 写错。

---

## 3. YAML 配置 + 代码读取

### 3.1 改端口

编辑 `src/main/resources/application-dev.yml`：

```yaml
server:
  port: 9090
```

**重启**应用后，`http://localhost:9090/api/learn/ping`。

### 3.2 自定义配置

`application.yml` 里：

```yaml
app:
  demo:
    site-name: 我的站点
    welcome-extra: 随便写
```

`application-dev.yml` 里可只覆盖其中一项（合并规则与 Spring profile 一致）。

### 3.3 代码里怎么读？

1. **类型安全一坨配置**：`AppDemoProperties` + `@ConfigurationProperties(prefix = "app.demo")` + 启动类 `@ConfigurationPropertiesScan`。
2. **单个值**：控制器里 `@Value("${server.port:8080}")` 等。

对照接口：**GET** `http://localhost:8080/api/learn/config-yml-demo`，看返回的 `siteName`、`welcomeExtra`、`serverPort`。

---

## 4. 已有能力 & 你还可以补什么（前端视角）

| 已有 | 说明 |
|------|------|
| 统一 `ApiResult` | 前端 axios/fetch 封装里统一判断 `code` |
| CORS | 本地联调 `localhost` 各端口 |
| GET / POST 示例 | `FrontendLearningController` |
| YAML + 绑定 | `application*.yml`、`AppDemoProperties` |

| 建议下一步 | 说明 |
|------------|------|
| `@Valid` + 校验注解 | POST 体必填、长度，错误时 400 + 统一错误体 |
| `@ControllerAdvice` | 全局把异常转成 `ApiResult`，避免每个接口 try-catch |
| SpringDoc / Swagger | 自动生成接口文档，类似前端看 OpenAPI |
| 鉴权 | Cookie / JWT / Session，再谈 `allowCredentials` 与 CORS 的坑 |

---

## 5. 接口速查

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/learn/ping` | 最简 GET |
| GET | `/api/learn/config-yml-demo` | YAML 配置读展示 |
| POST | `/api/learn/echo` | JSON 入参 echo |
| GET | `/api/hello` | 业务示例 |
| GET | `/api/health` | 健康检查 |
