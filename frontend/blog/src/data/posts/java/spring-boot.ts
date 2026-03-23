import type { Post } from '../../types'

/** 与仓库 `full-stack/backend/blog-api` 对照阅读 */
export const javaSpringBootPosts: Post[] = [
  {
    id: 'java-spring-boot-blog-api',
    title: 'Spring Boot 入门：blog-api 项目导读（前端对照）',
    subtitle: 'pom、启动类、@RestController、application.yml；案例在 full-stack/backend/blog-api',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', 'Spring Boot', 'REST', 'Maven', '全栈'],
    date: '2026-03-24',
    readTime: 12,
    pinned: true,
    content: [
      {
        type: 'paragraph',
        text: '本文对应你仓库里的 **`full-stack/backend/blog-api`**：Spring Boot **3.2** + Java **17** + Maven。下面用前端熟悉的概念做「映射」，再按文件走读；**CORS、统一响应体、分层、多环境、MockMvc 测试**等优化已在仓库中落地，可直接对照源码。',
      },
      { type: 'heading', level: 2, text: '一、和前端工具链怎么对应', anchor: 'npm-map' },
      {
        type: 'table',
        headers: ['前端', '本案例（Java）'],
        rows: [
          ['`package.json` + npm', '`pom.xml` + `mvn`（依赖、脚本式生命周期）'],
          ['`npm run dev` / Vite', '`./start.sh` 或 `mvn spring-boot:run` / `java -jar`'],
          ['Express `app.get(...)`', '`@RestController` + `@RequestMapping("/api")` + `@GetMapping`'],
          ['`.env` / 环境变量', '`src/main/resources/application.yml` + `application-{profile}.yml`'],
          ['把服务起在 3000/5173', '`server.port=8080`'],
        ],
      },
      { type: 'heading', level: 2, text: '二、项目里每个关键文件干什么', anchor: 'files' },
      {
        type: 'list',
        ordered: true,
        items: [
          '**`pom.xml`**：`spring-boot-starter-parent` 统一管理版本；`spring-boot-starter-web` 拉进 Spring MVC + 内嵌 Tomcat + Jackson（JSON）；`spring-boot-starter-test` 测；`devtools` 开发时热重启。',
          '**`BlogApiApplication.java`**：带 `@SpringBootApplication` 的 `main`，内部 `SpringApplication.run`——相当于「挂载根组件并启动开发服务器」。**注意**：主类所在包 `com.anzhiyu.blogapi` 默认会扫描其**子包**；控制器放在 `controller` 子包下，能被扫到。',
          '**`HelloController.java`**：调用 `HelloService`，返回 **`ApiResult` 泛型**（Jackson 序列化为 `{ code, message, data }`）。路径为 **`GET /api/hello`**、**`GET /api/health`**。',
          '**`HelloService.java`**：薄业务层，便于以后加数据库等逻辑而不堆在 Controller。',
          '**`WebMvcConfig.java`**：配置 **CORS**，`/api/**` 对 `localhost` / `127.0.0.1` 各端口放行，方便 Vite 直连。',
          '**`application*.yml`**：公共项在 `application.yml`，**`spring.profiles.active`** 默认 `dev`；`application-dev.yml` / `application-prod.yml` 分环境端口与日志；自定义键如 **`app.demo`** 由 `AppDemoProperties` 绑定，见 **`GET /api/learn/config-yml-demo`**。',
          '**`HelloControllerTest.java`**：`@SpringBootTest` + **MockMvc** 校验 JSON 字段，CI 可跑 `mvn test`。',
        ],
      },
      {
        type: 'code',
        lang: 'text',
        caption: '当前目录结构（与 README 一致）',
        code: `blog-api/
├── pom.xml
├── start.sh
├── README.md
└── src/main/java/com/anzhiyu/blogapi/
    ├── BlogApiApplication.java
    ├── common/ApiResult.java
    ├── config/WebMvcConfig.java
    ├── controller/HelloController.java
    └── service/HelloService.java
└── src/main/resources/
    ├── application.yml
    ├── application-dev.yml
    └── application-prod.yml
└── src/test/java/.../HelloControllerTest.java`,
      },
      { type: 'heading', level: 2, text: '三、怎么启动与自测', anchor: 'run' },
      {
        type: 'paragraph',
        text: '终端在 `blog-api` 目录：`chmod +x start.sh && ./start.sh`，或 `mvn spring-boot:run`。浏览器或 curl 访问 **`http://localhost:8080/api/hello`**、**`/api/health`**，响应为统一 JSON。生产可加参数 **`--spring.profiles.active=prod`**。若端口占用，README 里已有 `lsof` / `kill` 提示。',
      },
      { type: 'heading', level: 2, text: '四、已在仓库落地的优化（对照源码）', anchor: 'review' },
      {
        type: 'paragraph',
        text: '下面几项已从「建议」变为**可运行代码**，便于你 diff 学习；未落地的仍可作为下一步。',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '**CORS**：`config/WebMvcConfig.java`，`/api/**` + `localhost` / `127.0.0.1` 端口通配。',
          '**统一响应体**：`common/ApiResult.java`（`code` / `message` / `data`），接口不再直接裸返回字符串。',
          '**分层**：`HelloController` → `HelloService`，后续可接 `repository`。',
          '**多环境**：`application-dev.properties`、`application-prod.properties`，`spring.profiles.active` 默认 `dev`。',
          '**测试**：`HelloControllerTest` + MockMvc + `jsonPath` 断言。',
        ],
      },
      { type: 'heading', level: 3, text: '仍可继续做的方向', anchor: 'optimize' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**全局异常**：`@ControllerAdvice` 把异常统一包成 `ApiResult`。',
          '**依赖与安全**：关注 Spring Boot BOM 升级；接入 Spring Security / JWT。',
          '**OpenAPI**：SpringDoc 生成 Swagger，对标前端类型从接口生成。',
        ],
      },
      {
        type: 'tip',
        title: '注释很多要不要删',
        text: '学习项目保留很好；若将来当「模板仓库」，可抽一份 `docs/前端对照.md`，源码里只留简短 Javadoc，避免单文件过长。',
      },
      { type: 'heading', level: 2, text: '五、小结', anchor: 'summary' },
      {
        type: 'paragraph',
        text: '你已经具备 **Java 基础 + Maven** 的话，看这个案例的重点是：**启动链路（main → 容器 → Tomcat）**、**注解如何绑定 URL 到方法**、**配置如何进应用**。下一步可接数据库（JPA/MyBatis）、接 JWT 或 Spring Security，再与博客前端联调一条完整 CRUD。',
      },
    ],
  },
]
