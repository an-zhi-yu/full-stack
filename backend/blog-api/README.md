# Spring Boot 3 + Java 17 项目

## 项目概述

这是一个基于 Spring Boot 3 和 Java 17 的博客 API 项目，用于演示如何快速搭建一个 Spring Boot 应用，并包含常见**工程化实践**（统一响应、CORS、分层、多环境、接口测试）。

**前端转后端推荐阅读**：[`docs/前端学后端-REST与YAML配置.md`](docs/前端学后端-REST与YAML配置.md)（GET/POST、fetch、跨域、YAML、`application.yml`）。

## 技术栈

- Spring Boot 3.2.0
- Java 17
- Maven
- Spring Web

## 目录结构

```
backend/blog-api/
├── docs/
│   └── 前端学后端-REST与YAML配置.md   # GET/POST、fetch、CORS、YAML 说明
├── src/main/java/com/anzhiyu/blogapi/
│   ├── BlogApiApplication.java         # @ConfigurationPropertiesScan
│   ├── common/ApiResult.java
│   ├── config/
│   │   ├── AppDemoProperties.java      # 绑定 app.demo.*（YAML）
│   │   └── WebMvcConfig.java           # CORS
│   ├── controller/
│   │   ├── HelloController.java
│   │   └── FrontendLearningController.java  # 注释型：ping / echo / 读配置
│   ├── dto/
│   └── service/HelloService.java
├── src/main/resources/
│   ├── application.yml                 # 公共 + spring.profiles.active
│   ├── application-dev.yml             # 端口、日志、可覆盖 app.demo
│   └── application-prod.yml
└── src/test/java/.../*Test.java
```

## 已包含的工程化要点

| 要点 | 说明 |
|------|------|
| **统一 JSON** | 接口返回 `ApiResult`：`{ "code": 0, "message": "ok", "data": ... }` |
| **CORS** | `WebMvcConfig` 对 `/api/**` 放行 `localhost` / `127.0.0.1` 任意端口（方便 Vite 联调） |
| **分层** | `HelloController` → `HelloService` |
| **多环境** | `application.yml` + `application-{profile}.yml`；默认 `dev` |
| **自定义配置** | `app.demo.*` + `AppDemoProperties`；`GET /api/learn/config-yml-demo` 可验 |
| **测试** | `mvn test`（MockMvc） |

## 配置说明

- **端口**：`application-dev.yml` → `server.port`（改完需重启）
- **自定义业务项**：`application.yml` 中 `app.demo.site-name`、`app.demo.welcome-extra`

## 启动方式

> **必须先 `cd` 到本目录**（含 `pom.xml`）。

```bash
cd full-stack/backend/blog-api   # 按你机器路径调整
chmod +x start.sh && ./start.sh
# 或
mvn spring-boot:run
```

生产 profile：

```bash
java -jar target/blog-api-1.0.0.jar --spring.profiles.active=prod
```

## 访问测试

| 说明 | 方法 | URL |
|------|------|-----|
| 欢迎语 | GET | http://localhost:8080/api/hello |
| 健康检查 | GET | http://localhost:8080/api/health |
| **学习：最简 GET** | GET | http://localhost:8080/api/learn/ping |
| **学习：读 YAML** | GET | http://localhost:8080/api/learn/config-yml-demo |
| **学习：POST JSON echo** | POST | http://localhost:8080/api/learn/echo（Body 见文档） |

## 运行测试

```bash
mvn test
```

## 端口占用

```bash
lsof -i :8080
kill -9 <进程ID>
```

## 扩展建议

- `@Valid`、全局异常 `@ControllerAdvice`
- 数据库、Spring Security、SpringDoc（Swagger）
