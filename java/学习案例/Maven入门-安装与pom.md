# Maven 入门：安装、用 Maven 建项目、认识 pom.xml

面向：**前端转后端 / AI 全栈**、Java 与 Maven 零基础。

---

## 1. Maven 是什么？和前端比

| 前端 | Maven（Java） |
|------|----------------|
| `package.json` | `pom.xml`（项目模型 + 依赖 + 插件） |
| `npm install` | `mvn dependency:resolve` / 首次编译时自动拉依赖 |
| `node_modules/` | `~/.m2/repository/`（本机依赖缓存） |
| `npm run build` | `mvn compile` / `mvn package` |
| 约定 `src/` | 约定 `src/main/java`（主代码）、`src/test/java`（测试） |

Maven 还负责：**统一目录结构、插件体系、多模块项目**，后端团队几乎都用。

---

## 2. 安装 Maven

### 方式 A：IntelliJ IDEA 自带（推荐新手）

安装 **IDEA Ultimate / Community** 后，内置捆绑 Maven。  
`Settings → Build, Execution, Deployment → Build Tools → Maven` 里可看到 **Maven home**。  
在 IDEA 里 **Open** 本仓库的 `maven-intro` 文件夹，右侧 **Maven** 工具窗口点 **Lifecycle → compile / package** 即可。

### 方式 B：命令行安装（Mac Homebrew）

```bash
brew install maven
mvn -v
```

### 方式 C：只装 JDK，用 IDEA 跑

不装独立 Maven 也可以：用 IDEA 打开项目，由 IDEA 调用捆绑 Maven。

---

## 3. 本仓库示例位置

路径：**`full-stack/java/basics/maven-intro/`**

- **`pom.xml`**：项目描述（GAV、JDK 版本、插件）
- **`src/main/java/com/anzhiyu/mavenintro/MavenIntroApp.java`**：带注释的入口类

---

## 4. 常用命令（在 `maven-intro` 目录执行）

**输出在哪看？** `MavenIntroApp` 里的 `System.out.println` 会打印到**你运行命令的那个终端**（或 IDEA 的 **Run** 窗口），**不会**在 `src/` 或 `target/` 里自动生成结果文件；若需要保存成文件，要用重定向，例如：`mvn -q compile exec:java > out.txt`。

```bash
cd full-stack/java/basics/maven-intro

# 编译（生成 target/classes）
mvn compile

# 编译并运行 main（本示例已配置 exec 插件）
mvn compile exec:java

# 打包成 jar（target/maven-intro-1.0-SNAPSHOT.jar）
mvn package

# 只看依赖树（以后加了 Spring 等很有用）
mvn dependency:tree
```

---

## 5. pom.xml 里你最该先认识的标签

- **`<groupId>` / `<artifactId>` / `<version>`**：合称 **GAV**，唯一标识这个项目。
- **`<properties>`**：如 `maven.compiler.source` = Java 版本。
- **`<dependencies>`**：第三方库（类似 npm dependencies）。
- **`<build><plugins>`**：编译、打包、运行 main 等插件（类似 npm scripts 背后的工具）。

更细的逐行说明见 **`pom.xml` 里的 XML 注释**。

---

## 6. 常见坑

- **JDK 版本**：本示例用 **Java 17**，请 `java -version` 确认 ≥17。
- **包名与目录**：`package com.anzhiyu.mavenintro` 必须对应 `.../com/anzhiyu/mavenintro/`。
- **第一次很慢**：Maven 会从中央仓库下载插件和依赖，需联网。

博客文章：《Maven 入门：安装、建项目与 pom.xml（前端视角）》与本文配套。

**进阶（加依赖、Gson）：** [Maven依赖坐标与Gson.md](./Maven依赖坐标与Gson.md)

**常见疑问（main / mainClass / CLI / 依赖下载 / 后端运行模型）：** 见博客《Maven 入门》**第六节**，或 [后端小白答疑-CLI依赖与运行模型.md](./后端小白答疑-CLI依赖与运行模型.md)
