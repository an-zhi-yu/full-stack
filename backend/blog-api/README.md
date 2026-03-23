# Spring Boot 3 + Java 17 项目

## 项目概述

这是一个基于 Spring Boot 3 和 Java 17 的博客 API 项目，用于演示如何快速搭建一个 Spring Boot 应用，并包含常见**工程化实践**（统一响应、CORS、分层、多环境、接口测试）。

## 技术栈

- Spring Boot 3.2.0
- Java 17
- Maven
- Spring Web

## 目录结构

```
backend/blog-api/
├── src/
│   ├── main/
│   │   ├── java/com/anzhiyu/blogapi/
│   │   │   ├── BlogApiApplication.java    # 启动类
│   │   │   ├── common/ApiResult.java        # 统一 API 响应体 { code, message, data }
│   │   │   ├── config/WebMvcConfig.java     # 跨域等 Web 配置
│   │   │   ├── controller/HelloController.java
│   │   │   └── service/HelloService.java    # 业务层（示例较薄）
│   │   └── resources/
│   │       ├── application.properties       # 公共配置 + 激活的 profile
│   │       ├── application-dev.properties   # 开发环境
│   │       └── application-prod.properties # 生产环境（示例）
│   └── test/java/.../HelloControllerTest.java  # MockMvc 接口测试
├── target/
├── pom.xml
├── start.sh
└── README.md
```

## 已包含的工程化要点

| 要点 | 说明 |
|------|------|
| **统一 JSON** | 接口返回 `ApiResult`：`{ "code": 0, "message": "ok", "data": ... }` |
| **CORS** | `WebMvcConfig` 对 `/api/**` 放行 `localhost` / `127.0.0.1` 任意端口（方便 Vite 联调） |
| **分层** | `HelloController` → `HelloService`，后续可继续加 `repository` 等 |
| **多环境** | `spring.profiles.active` 默认 `dev`；生产可 `java -jar app.jar --spring.profiles.active=prod` |
| **测试** | `HelloControllerTest` 使用 `@SpringBootTest` + `MockMvc` |

## 配置说明

### 1. 依赖配置 (pom.xml)

- `spring-boot-starter-web`：Web / JSON
- `spring-boot-starter-test`：JUnit 5、MockMvc 等
- `spring-boot-devtools`：开发热重启（optional）

### 2. 应用配置

- **`application.properties`**：`spring.application.name`、`spring.profiles.active=dev`
- **`application-dev.properties`**：端口、调试日志
- **`application-prod.properties`**：生产日志级别示例

## 启动方式

> **必须先进入项目根目录**（该目录下要有 `pom.xml`）。  
> 若你在 `~/Desktop/zw` 之类上级目录执行 `mvn`，会报：`there is no POM in this directory`。

```bash
cd /Users/zw/Desktop/zw/full-stack/backend/blog-api
# 或相对路径：cd full-stack/backend/blog-api
```

### 1. 使用启动脚本

```bash
chmod +x start.sh
./start.sh
```

### 2. 手动启动

```bash
mvn spring-boot:run
# 或
mvn clean package -DskipTests
java -jar target/blog-api-1.0.0.jar
```

指定环境：

```bash
java -jar target/blog-api-1.0.0.jar --spring.profiles.active=prod
```

## 访问测试

接口前缀为 **`/api`**，响应均为 JSON（`ApiResult`）：

| 说明 | 方法 | URL |
|------|------|-----|
| 欢迎语 | GET | http://localhost:8080/api/hello |
| 健康检查 | GET | http://localhost:8080/api/health |

示例响应：

```json
{"code":0,"message":"ok","data":"Hello, Spring Boot 3 + Java 17!"}
```

```json
{"code":0,"message":"ok","data":{"status":"UP"}}
```

## 运行测试

```bash
mvn test
```

## 端口占用解决

```bash
lsof -i :8080
kill -9 <进程ID>
```

## 常见问题

### 1. 启动失败

- Java 17
- 端口未被占用
- Maven 依赖已下载

### 2. 依赖下载失败

```bash
mvn clean dependency:purge-local-repository package -DskipTests
```

## 扩展建议

- 数据库：JPA / MyBatis + MySQL 等
- 安全：Spring Security / JWT
- 文档：SpringDoc OpenAPI（Swagger）
- 全局异常：`@ControllerAdvice` 把异常也包成 `ApiResult`
