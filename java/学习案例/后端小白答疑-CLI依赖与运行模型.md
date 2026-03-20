# 后端小白答疑：CLI、依赖下载、mainClass、运行模型（对照前端）

> **与博客同步**：以上内容已并入博客文章《Maven 入门：安装、建项目与 pom.xml（前端视角）》**第六节 · 常见疑问**。本文档便于在仓库里纯 Markdown 查阅。

---

## 0. 每个包只能有一个 main？mainClass 是指定哪个包吗？

**不是。** Java 没有「每个包只能有一个 `main`」的规定；同一 package 下可以有**多个类**，各自写 `public static void main` 都可以。

`pom.xml` 里 **`exec-maven-plugin` 的 `mainClass`** 填的是 **某一个类的全限定名**（包 + 类名），表示 **`mvn exec:java` 默认从哪个类启动**，不是「指定整个包」。换入口就改 `mainClass` 或用 `java -cp ... 其他全限定名`。

---

## 1. 前端有 CLI（create-vite 等），后端有吗？

**有**，常见几类：

| 工具 | 作用（类比） |
|------|----------------|
| **Spring Initializr**（网页 / IDEA「新建 Spring」） | 像选模板生成带依赖的 Spring Boot 工程 |
| **`mvn archetype:generate`** | Maven 官方「脚手架」，按模板生成目录和 pom |
| **JHipster、Quarkus CLI** 等 | 各生态自己的生成器 |

日常学语法、小 demo 也可以 **不用 CLI**：像本仓库的 `maven-intro` 一样，复制一个最小 `pom.xml` + `src/main/java` 即可。

---

## 2. 前端是 `npm i xx`，后端 Gson 是怎么「下载」的？

**区别在习惯用法：**

- **npm**：先改 `package.json` 再 `npm install`，或一条命令 `npm i lodash` 自动写进 `package.json`。
- **Maven**：一般 **先在 `pom.xml` 的 `<dependencies>` 里写好坐标**，再执行 **`mvn compile`**（或 `mvn package`、`mvn dependency:resolve`）。Maven 会解析 pom，**发现缺少 jar 就自动从中央仓库下载**到 `~/.m2/repository/`，**没有单独一条必做的「mvn install gson」**（除非你只想下载不进工程，可用 `mvn dependency:get` 等）。

所以 Gson 是：**你保存 pom → 下一次 mvn 编译时自动拉取**，效果上等同于「装依赖」，只是入口命令常是 **compile** 而不是一个叫 `install-dependency` 的交互命令。

---

## 3. `exec-maven-plugin` 里的 `mainClass` 是配置「入口路径」吗？

**不完全是路径，而是「入口类的全名」。**

- 配置的是：**包名 + 类名**，例如 `com.anzhiyu.mavenintro.MavenIntroApp`。
- **不是** `src/main/java/.../MavenIntroApp.java` 这种文件路径（那是给人类和 IDE 看的）。
- 运行期 JVM 找的是：**classpath 里的 `MavenIntroApp.class`**，并执行其中的 **`public static void main(String[] args)`**。

换入口类时：新建别的类写好 `main`，再把 `mainClass` 改成那个类的全限定名即可。

---

## 4. 不理解后端运行流程：前端有 main、加载资源、浏览器渲染；后端一般干什么？接口 CRUD 是不是都是「被动」的？

可以分几类看，不只有「被动接口」一种：

| 形态 | 谁在「主动跑」 | 典型场景 |
|------|----------------|----------|
| **命令行 / 工具程序** | `main` 跑完就结束 | 你现在的 `MavenIntroApp`、批处理脚本、数据迁移小工具 |
| **长期驻留的服务器（Web）** | 进程一直开着；**请求来了再执行**你的 Controller / Servlet | **REST CRUD**、BFF、Spring Boot 应用——你说的「被动」主要指这种：**请求驱动** |
| **定时任务** | 调度器按 cron 触发 | 定时同步、报表、清理 |
| **消息队列消费者** | 有消息就处理 | 异步业务、削峰 |

**和前端对比：**

- **浏览器里的前端**：用户打开页面 → 加载 JS → 可能有一个「应用入口」（如 `main.tsx` mount），之后多是 **事件 / 路由** 驱动。
- **后端 API 服务**：进程启动时跑 **Spring Boot 的 main**（只负责**拉起容器、注册路由、监听端口**），之后业务逻辑大多是 **HTTP 请求进来 → 进某个接口方法**——所以常说是「被动」的，但 **进程本身是主动一直运行的**。
- **你写的 `MavenIntroApp`**：更像 **脚本型 main**，**主动从上到下执行完就退出**，和「开一个网站服务」不是同一种运行模型，但都是合法的后端入门路径。

总结：**接口 CRUD 多数是请求触发的（被动执行业务代码）；后端还有主动跑的批处理、定时任务、消息消费等。** 学 Maven + Gson 这种，是在为「能搭服务、能加依赖、能写业务逻辑」打基础。

---

以上内容可与 `Maven入门`、`Maven依赖坐标与Gson` 两篇学习案例配合阅读。
