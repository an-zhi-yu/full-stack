# Maven 依赖：坐标（GAV）、下载位置、Gson 示例

面向：前端转后端，已能跑通 `maven-intro` 的 `mvn compile exec:java`。

---

## 1. 什么是「坐标」？

每个依赖（和你自己的项目一样）用 **GAV** 唯一确定：

| 字段 | 含义 | Gson 示例 |
|------|------|-----------|
| **groupId** | 组织/厂商，常域名反写 | `com.google.code.gson` |
| **artifactId** | 构件名（jar 名核心部分） | `gson` |
| **version** | 版本 | `2.11.0` |

Maven 用这三个值去 **中央仓库**（默认）解析 jar 的下载地址。

---

## 2. 依赖下载到哪？

本机缓存目录：**`~/.m2/repository/`**

Gson 2.11.0 大致路径：

`~/.m2/repository/com/google/code/gson/gson/2.11.0/gson-2.11.0.jar`

- 第一次 `mvn compile` 会**联网下载**（需网络）。
- 之后同版本**直接用缓存**，和 `node_modules` 里已有包不再重复下载类似。

---

## 3. 本仓库代码在哪？

目录：**`basics/maven-intro/`**

- **`pom.xml`**：`<dependencies>` 里声明 Gson。
- **`CourseCard.java`**：简单 POJO，给 Gson 映射字段。
- **`GsonIntroDemo.java`**：`fromJson` / `toJson` 演示。
- **`MavenIntroApp.java`**：`main` 里调用 `GsonIntroDemo.run()`。

运行：

```bash
cd full-stack/java/basics/maven-intro
mvn -q compile exec:java
```

查看依赖树：

```bash
mvn dependency:tree
```

---

## 4. 和 npm 对照

| npm | Maven |
|-----|--------|
| `package.json` 里 `"dependencies"` | `pom.xml` 里 `<dependencies>` |
| `npm install` 拉包到 `node_modules` | `mvn compile` 解析并下载到 `~/.m2/repository` |
| 包名 `@scope/pkg@version` | 坐标 `groupId:artifactId:version` |

博客文章：《Maven 依赖与 Gson：坐标与本地仓库》与本文配套。
