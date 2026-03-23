import type { Post } from '../../types'

export const javaMavenPosts: Post[] = [
  // ─────────────────────────────────────────────────────────
  // 13. Maven 入门（前端视角）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-maven-intro-pom',
    title: 'Maven 入门：安装、建项目与 pom.xml（前端视角）',
    subtitle: '为 AI 全栈铺路：认识 Java 项目构建工具，对标 npm 与 package.json',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', 'Maven', 'pom.xml', '构建工具', '全栈'],
    date: '2026-03-18',
    readTime: 12,
    content: [
      {
        type: 'paragraph',
        text: '你是前端，要学 Java 后端：除了语法，迟早要面对 **Maven**（或 Gradle）。Maven 负责：约定目录、拉依赖、编译、打包、跑插件。本文用「对标 npm」的方式讲清：**安装 / IDEA 自带**、**用 Maven 建项目的本质**、**pom.xml 里每一块是什么**。仓库里已放好可运行示例 `full-stack/java/basics/maven-intro/`。文末 **第六节** 整理了 Maven 学习中的常见疑问（含 main、mainClass、依赖下载、后端运行模型等）。',
      },
      { type: 'heading', level: 2, text: '一、Maven 与前端工具怎么对应', anchor: 'npm-map' },
      {
        type: 'table',
        headers: ['前端', 'Maven（Java）'],
        rows: [
          ['package.json', 'pom.xml（项目模型 + 依赖 + 插件）'],
          ['npm install', '首次编译时自动解析依赖，或 mvn dependency:resolve'],
          ['node_modules/', '~/.m2/repository/（本机依赖缓存）'],
          ['npm run build', 'mvn compile / mvn package'],
          ['src/', 'src/main/java（主代码）、src/test/java（测试）'],
        ],
      },
      {
        type: 'tip',
        title: '为什么要学 Maven',
        text: 'Spring Boot、公司后端项目几乎都基于 Maven/Gradle。会看 pom、会加依赖、会 package，是接真实项目的门槛。',
      },
      { type: 'heading', level: 2, text: '二、安装 Maven', anchor: 'install' },
      {
        type: 'list',
        ordered: true,
        items: [
          '**IntelliJ IDEA 自带（推荐）**：Settings → Build Tools → Maven，使用 Bundled Maven；用 IDEA Open 本仓库的 maven-intro 文件夹即可。',
          '**Mac Homebrew**：brew install maven，然后 mvn -v 验证。',
          '**只用 Cursor**：可装 Maven CLI，或在 IDEA 里打开同一目录用图形化 Lifecycle。',
        ],
      },
      { type: 'heading', level: 2, text: '三、pom.xml 最核心几块', anchor: 'pom-core' },
      {
        type: 'paragraph',
        text: 'pom = Project Object Model。你最先要认的是下面四块（示例项目里都有 XML 中文注释）：',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '**GAV**：groupId、artifactId、version —— 唯一标识这个项目（类似 npm 包名 + 版本）。',
          '**properties**：如 Java 17，避免版本写散在各处。',
          '**dependencies**：第三方库（Spring、JUnit 等），以后最常改这里。',
          '**build / plugins**：编译插件、打包插件、本示例里的 exec 插件用于 mvn exec:java 直接跑 main。',
        ],
      },
      {
        type: 'code',
        lang: 'xml',
        caption: 'GAV 与 Java 版本（节选）',
        code: `<groupId>com.anzhiyu</groupId>
<artifactId>maven-intro</artifactId>
<version>1.0-SNAPSHOT</version>

<properties>
  <maven.compiler.source>17</maven.compiler.source>
  <maven.compiler.target>17</maven.compiler.target>
</properties>`,
      },
      { type: 'heading', level: 2, text: '四、本仓库示例怎么跑', anchor: 'run-demo' },
      {
        type: 'code',
        lang: 'bash',
        caption: '在 maven-intro 目录下',
        code: `cd full-stack/java/basics/maven-intro
mvn compile exec:java`,
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果',
        code: `========== Maven 入门示例 ==========
若你看到本行，说明：pom.xml 配置正确，且 mvn compile exec:java 已成功执行。
...（下方还有 Gson 演示输出，见文章《Maven 依赖与 Gson》）`,
      },
      {
        type: 'paragraph',
        text: '源码路径：`basics/maven-intro/`（含 `MavenIntroApp.java`、Gson 示例与 `pom.xml`）。学习案例：`java/学习案例/Maven入门-安装与pom.md`；加依赖见 `Maven依赖坐标与Gson.md`。',
      },
      {
        type: 'heading',
        level: 2,
        text: '五、常用命令备忘',
        anchor: 'mvn-cmds',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: '',
        code: `mvn compile          # 编译到 target/classes
mvn package          # 打 jar
mvn dependency:tree  # 看依赖树（加库以后很有用）`,
      },
      { type: 'heading', level: 2, text: '六、常见疑问（Maven 与后端入门）', anchor: 'maven-faq' },
      {
        type: 'heading',
        level: 3,
        text: '每个包只能有一个 main？mainClass 是指定「哪个包」吗？',
        anchor: 'faq-main-per-package',
      },
      {
        type: 'paragraph',
        text: '**不是。** Java **没有**「每个包只能有一个 main」这种语法规定。同一个包（package）里完全可以有**多个类**，每个类里都可以写 `public static void main(String[] args)` —— 和「一个文件一个 public 顶层类」的规则是两回事。',
      },
      {
        type: 'paragraph',
        text: '`exec-maven-plugin` 的 **`mainClass`** 填的是 **某一个类的全限定名**（包名 + 类名，如 `com.anzhiyu.mavenintro.MavenIntroApp`），表示执行 **`mvn exec:java` 时默认从哪个类启动**。它**不是**「指定一个包」，而是**指定一个入口类**。想跑另一个带 main 的类时：改 `mainClass`，或不用插件、直接用 `java -cp ... 另一个全限定名`。',
      },
      {
        type: 'heading',
        level: 3,
        text: '前端有 create-vite 这种 CLI，后端有吗？',
        anchor: 'faq-cli',
      },
      {
        type: 'paragraph',
        text: '有。常见如 **Spring Initializr**（网页或 IDEA 新建 Spring Boot）、**`mvn archetype:generate`**（Maven 脚手架）。小练习也可以不用 CLI，像本仓库 `maven-intro` 一样维护 `pom.xml` + `src/main/java` 即可。',
      },
      {
        type: 'heading',
        level: 3,
        text: '为什么没看到像 npm i gson 一样装依赖？',
        anchor: 'faq-npm-vs-mvn',
      },
      {
        type: 'paragraph',
        text: '习惯不同：**Maven** 一般在 `pom.xml` 的 `<dependencies>` 里写好坐标，再执行 **`mvn compile`**（或 `package`、`dependency:resolve`）。Maven 解析时发现本地缺 jar 就会**自动从中央仓库下载**到 `~/.m2/repository/`，所以往往**没有单独一条必做的「安装某库」命令**——**编译/打包本身就是触发下载的时机**。需要时也可用 `mvn dependency:get` 等。',
      },
      {
        type: 'heading',
        level: 3,
        text: 'mainClass 配的是 .java 文件路径吗？',
        anchor: 'faq-mainclass-path',
      },
      {
        type: 'paragraph',
        text: '**不是。** 配的是 **全限定类名**，不是磁盘路径。JVM 执行的是 **`.class`**，入口是该类里的 **`public static void main`**。对应关系示例：`com.anzhiyu.mavenintro.MavenIntroApp` ↔ 源文件 `.../mavenintro/MavenIntroApp.java`。',
      },
      {
        type: 'heading',
        level: 3,
        text: '后端运行流程和前端差在哪？接口 CRUD 是不是都很「被动」？',
        anchor: 'faq-backend-flow',
      },
      {
        type: 'paragraph',
        text: '**命令行小工具**（如当前 `MavenIntroApp`）：`main` **跑完就退出**，是主动执行一轮。**Web 后端**（如 Spring Boot）：也有一个 `main`，但主要负责**启动容器、监听端口**；之后业务多是 **HTTP 请求进来再进 Controller**——业务代码常表现为「请求驱动」，但**进程本身是长时间运行的**。此外还有定时任务、消息消费者等。接口 CRUD 是后端很常见的形态，但不是唯一形态。',
      },
      {
        type: 'paragraph',
        text: '学习案例原文档：`java/学习案例/后端小白答疑-CLI依赖与运行模型.md`（与第六节内容一致，可对照仓库阅读）。',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 14. Maven 依赖与 Gson（坐标、本地仓库）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-maven-dependency-gson',
    title: 'Maven 依赖与 Gson：坐标、下载与在代码里使用',
    subtitle: '在 pom.xml 声明依赖，理解 GAV 与 ~/.m2，用 Gson 做 JSON 与对象互转',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', 'Maven', 'Gson', '依赖', 'JSON', '全栈'],
    date: '2026-03-19',
    readTime: 7,
    content: [
      {
        type: 'paragraph',
        text: '上一篇讲了 Maven 与 pom.xml；本篇做一件后端日常最高频的事：**在 pom.xml 里加第三方依赖**，并理解 **坐标（GAV）**、**jar 下载到哪里**、**为什么 import 能编译通过**。示例库选 **Gson**（Google 的 JSON 库），和前端 `JSON.parse` / `JSON.stringify` 很好类比。代码在 `full-stack/java/basics/maven-intro/`。',
      },
      { type: 'heading', level: 2, text: '一、依赖的「坐标」是什么？', anchor: 'gav' },
      {
        type: 'paragraph',
        text: '和「你自己项目的 GAV」一样，**每一个**别人发布的 jar 也用三个字段唯一标识，合称 **GAV**：',
      },
      {
        type: 'table',
        headers: ['字段', '含义', 'Gson 示例'],
        rows: [
          ['groupId', '组织/厂商，常域名反写', 'com.google.code.gson'],
          ['artifactId', '构件名', 'gson'],
          ['version', '版本号', '2.11.0'],
        ],
      },
      {
        type: 'paragraph',
        text: '在 pom.xml 里写一段 <dependency>，Maven 就能根据 GAV 去 **Maven Central** 解析下载地址（类似 npm 根据包名去 registry）。',
      },
      {
        type: 'code',
        lang: 'xml',
        caption: 'pom.xml 中声明 Gson（节选）',
        code: `<dependency>
  <groupId>com.google.code.gson</groupId>
  <artifactId>gson</artifactId>
  <version>2.11.0</version>
</dependency>`,
      },
      { type: 'heading', level: 2, text: '二、依赖下载到哪？', anchor: 'm2-repo' },
      {
        type: 'paragraph',
        text: '默认缓存目录：**用户目录下的 `~/.m2/repository/`**。Gson 会落在类似 `.../com/google/code/gson/gson/2.11.0/gson-2.11.0.jar` 的路径。第一次 `mvn compile` 需要联网下载；之后同版本直接用本地缓存，和 npm 装过的包不再重复拉取类似。',
      },
      {
        type: 'tip',
        title: '怎么确认依赖真的进来了？',
        text: '在项目根执行 `mvn dependency:tree`，会看到 `com.google.code.gson:gson:jar:2.11.0:compile` 一行。',
      },
      { type: 'heading', level: 2, text: '三、在代码里用 Gson', anchor: 'gson-code' },
      {
        type: 'paragraph',
        text: '示例里增加了 `CourseCard`（简单 POJO）和 `GsonIntroDemo`：`fromJson` 把 JSON 字符串变成 Java 对象，`toJson` 把对象变回 JSON。`MavenIntroApp` 的 `main` 末尾会调用 `GsonIntroDemo.run()`。',
      },
      {
        type: 'code',
        lang: 'java',
        caption: '反序列化 / 序列化（与前端 JSON API 对照）',
        code: `Gson gson = new GsonBuilder().setPrettyPrinting().create();

// JSON → 对象（类似 JSON.parse，但是强类型 CourseCard）
CourseCard parsed = gson.fromJson(jsonString, CourseCard.class);

// 对象 → JSON（类似 JSON.stringify）
String out = gson.toJson(new CourseCard("Spring Boot 基础", 8));`,
      },
      { type: 'heading', level: 2, text: '四、怎么运行', anchor: 'run' },
      {
        type: 'code',
        lang: 'bash',
        caption: '',
        code: `cd full-stack/java/basics/maven-intro
mvn -q compile exec:java`,
      },
      {
        type: 'code',
        lang: 'text',
        caption: '运行结果（节选，在终端输出）',
        code: `========== Maven 入门示例 ==========
...
========== Gson 依赖演示（Maven 已下载坐标对应的 jar）==========
① 反序列化 fromJson → CourseCard{title='Java 与 Maven 入门', lessonCount=12}
② 序列化 toJson →
{
  "title": "Spring Boot 基础",
  "lessonCount": 8
}
==============================================================`,
      },
      {
        type: 'paragraph',
        text: '学习案例：`java/学习案例/Maven依赖坐标与Gson.md`。源码：`MavenIntroApp.java`、`GsonIntroDemo.java`、`CourseCard.java`、`pom.xml`（含 XML 注释）。',
      },
    ],
  },
]
