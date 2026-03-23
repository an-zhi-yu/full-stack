import type { Post } from '../../types'

export const javaEngineeringPosts: Post[] = [
  // ─────────────────────────────────────────────────────────
  // 15. Java 编码与工程规范（前端对照）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-style-conventions',
    title: 'Java 编码与工程规范速览（命名、包、资源）',
    subtitle: '从前端视角整理：类/方法/变量怎么起名、包与目录、配置文件与资源命名',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '规范', '命名', '工程化', '全栈'],
    date: '2026-03-20',
    readTime: 10,
    content: [
      {
        type: 'paragraph',
        text: '学完语法后，下一步是**写得像工业界 Java**。本文从前端熟悉的「变量/方法/文件夹命名」出发，对照整理 **Java 官方与社区主流约定**（与 Google Java Style Guide、多数公司规范一致），方便你读开源代码、进团队不违和。',
      },
      { type: 'heading', level: 2, text: '一、权威与工具', anchor: 'authority' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**Oracle / Java Language Specification**：语法层规则。',
          '**Google Java Style Guide**：业界最常用的书写风格参考（缩进、换行、命名）。',
          '**Checkstyle / Spotless / SpotBugs**：类似 ESLint + Prettier + 部分静态检查，可在 CI 里强制规范。',
        ],
      },
      { type: 'heading', level: 2, text: '二、标识符命名（你最关心的）', anchor: 'naming' },
      {
        type: 'table',
        headers: ['类型', '风格', '示例', '前端类比'],
        rows: [
          ['类、接口、枚举', 'UpperCamelCase（大驼峰）', 'UserService, HttpClient', 'React 组件名、TS 类名'],
          ['方法、变量、参数', 'lowerCamelCase（小驼峰）', 'findUser(), maxRetry', '函数名、let/const'],
          ['常量', 'UPPER_SNAKE_CASE', 'MAX_SIZE, DEFAULT_TIMEOUT', '全大写下划线'],
          ['包 package', '全小写，点分隔', 'com.anzhiyu.blog.api', 'npm scope 小写习惯'],
        ],
      },
      {
        type: 'tip',
        title: '类名文件',
        text: '一个源文件里**最多一个 public 顶层类**，且**文件名必须与该类名完全一致**（含大小写），扩展名 .java。非 public 的顶层类可以多个，但团队一般避免。',
      },
      { type: 'heading', level: 2, text: '三、包（package）与目录', anchor: 'package-dir' },
      {
        type: 'paragraph',
        text: '**包名 = 磁盘目录结构**：`package com.anzhiyu.demo` 对应 `com/anzhiyu/demo/`。包名一般用**公司域名反写**避免全球冲突，**全小写**，不用连字符（连字符在包名里不合法）。',
      },
      { type: 'heading', level: 2, text: '四、Maven / 资源文件命名', anchor: 'resources' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**src/main/resources**：配置文件常用 `application.yml` / `application.properties`（Spring），或 `logback.xml`；名字**小写+连字符**或**点分**都可，团队统一即可。',
          '**国际化**：`messages_zh_CN.properties`、`messages_en.properties` 等约定。',
          '**静态模板**：按模块分子目录，如 `templates/`、`static/`，与 Spring Boot 约定一致。',
        ],
      },
      { type: 'heading', level: 2, text: '五、可读性与注释', anchor: 'comments' },
      {
        type: 'paragraph',
        text: '公共 API、复杂算法写 **Javadoc**（/** ... */）；业务方法用**中文或英文**单行注释均可，**团队统一语言**。避免无意义注释；魔法数字尽量提成**命名常量**。',
      },
      { type: 'heading', level: 2, text: '六、小结', anchor: 'summary-style' },
      {
        type: 'paragraph',
        text: '记住：**类大驼峰、方法变量小驼峰、常量全大写下划线、包全小写对齐目录**。大项目还会用 Checkstyle 等在 PR 里自动卡风格——和前端 lint-staged 同一思路。',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 16. Java 三种常见目录结构（可扩展）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-project-structure-three',
    title: 'Java 常见项目目录结构：三种主流形态与扩展性',
    subtitle: 'Maven 标准目录、Spring Boot 分层、多模块父工程——从大厂常见实践理解怎么选',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '目录结构', 'Maven', 'Spring Boot', '架构'],
    date: '2026-03-21',
    readTime: 11,
    content: [
      {
        type: 'paragraph',
        text: '前端有「按页面 / 按功能 / monorepo」等组织方式；Java 后端也有**约定大于配置**的目录习惯。下面三种由简到繁，**覆盖个人学习 → 单应用服务 → 大项目拆分**，都是国内团队极常见的选型。',
      },
      { type: 'heading', level: 2, text: '形态一：Maven 标准目录（单模块库或小程序）', anchor: 'maven-standard' },
      {
        type: 'paragraph',
        text: '**特点**：官方约定，工具链默认就认；适合**学习、工具库、小型服务**。',
      },
      {
        type: 'code',
        lang: 'text',
        caption: '典型结构',
        code: `项目根/
├── pom.xml
├── src/main/java/          # 生产代码（包名对应子目录）
├── src/main/resources/     # 配置文件、非代码资源
├── src/test/java/          # 单元测试
└── src/test/resources/     # 测试用资源`,
      },
      {
        type: 'tip',
        title: '扩展性',
        text: '业务变大后可**原址加分包**（如 api / service / domain），或升级到形态二、三。',
      },
      { type: 'heading', level: 2, text: '形态二：Spring Boot 单应用 + 分层包（最流行 Web 后端）', anchor: 'spring-layers' },
      {
        type: 'paragraph',
        text: '**特点**：在 `src/main/java` 下按**职责分包**，与「控制器 / 业务 / 数据访问」对应，和前端「pages / services / api」分层思想一致。',
      },
      {
        type: 'code',
        lang: 'text',
        caption: '常见包划分（名称可微调）',
        code: `com.company.app
├── Application.java          # 启动类（main）
├── controller    (或 web)   # HTTP 入参出参、路由
├── service                    # 业务逻辑
├── repository  (或 mapper)  # 数据库访问
├── domain / model / dto      # 实体、传输对象
└── config / common / util    # 配置、工具`,
      },
      {
        type: 'paragraph',
        text: '**扩展性**：单体内先**纵向分包**；团队变大后可把某一层先拆成**独立模块**（过渡到形态三）。',
      },
      { type: 'heading', level: 2, text: '形态三：Maven 多模块（企业级、易扩展）', anchor: 'multi-module' },
      {
        type: 'paragraph',
        text: '**特点**：仓库根有一个 **父 pom**（packaging=pom），只管理**版本与公共依赖**；下面多个子模块各自有独立 `pom.xml`。**大厂与开源中大型项目**极常见。',
      },
      {
        type: 'code',
        lang: 'text',
        caption: '示例模块划分',
        code: `parent/
├── pom.xml                 # 父 POM：dependencyManagement、插件版本
├── app-api/                # 对外 API 契约、DTO
├── app-service/            # 业务实现、可部署的 Spring Boot
├── app-common/             # 工具、常量、公共异常
└── app-integration/        # 可选：第三方对接、消息等`,
      },
      {
        type: 'warning',
        title: '不要盲目上多模块',
        text: '个人学习、小服务用**形态一或二**即可；多模块带来**构建顺序、IDE 导入、发布流程**成本，等业务边界清晰再拆。',
      },
      { type: 'heading', level: 2, text: '三种怎么选（简表）', anchor: 'compare' },
      {
        type: 'table',
        headers: ['形态', '适用', '扩展方式'],
        rows: [
          ['Maven 标准单模块', '学习、类库、小工具', '加分包或再建模块'],
          ['Spring Boot 分层', '单体 Web/API、团队 1～N 人', '分包 → 再拆模块'],
          ['多模块父工程', '多团队、清晰边界、复用 common', '按域继续加子模块'],
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 17. Java 基础新手注意点（坑点清单）
  // ─────────────────────────────────────────────────────────
  {
    id: 'java-beginner-pitfalls',
    title: 'Java 基础新手易踩坑清单（对照前端思维）',
    subtitle: '字符串比较、整数除法、空指针、包与目录、泛型与 equals——能整理多少是多少',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '新手', '踩坑', '基础', '全栈'],
    date: '2026-03-22',
    readTime: 12,
    content: [
      {
        type: 'paragraph',
        text: '以下不重复语法课，只列**容易带着 JS 习惯误用**或**一跑就懵**的点。建议收藏，写代码时对照。',
      },
      { type: 'heading', level: 2, text: '一、类型与运算', anchor: 'types-ops' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**整数相除**：`3 / 2` 结果是 **1**（int），要小数请 `3.0 / 2` 或强转。',
          '**比较字符串内容**：用 **equals**，不要 ==（== 比的是引用，类似 JS 里比对象引用）。',
          '**boolean**：条件必须是 boolean，不能写 `if (1)`。',
          '**char 与 String**：单引号是 char，双引号是 String，类型不同。',
        ],
      },
      { type: 'heading', level: 2, text: '二、空指针与集合', anchor: 'null-collections' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**NullPointerException**：对 **null** 调方法、拆箱、取字段会炸；习惯上**尽早校验**或使用 Optional（进阶）。',
          '**Arrays.asList** 得到的 List **不能 add/remove**（定长）；要可变用 **new ArrayList<>()**。',
          '**增强 for 里删除元素**：可能 ConcurrentModificationException，用迭代器 remove 或新集合。',
        ],
      },
      { type: 'heading', level: 2, text: '三、面向对象与 equals', anchor: 'oop-equals' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**重写 equals 时常要重写 hashCode**（尤其要放进 HashMap/HashSet 时）。',
          '**方法隐藏与重写**：子类 static 方法不会多态「重写」父类实例方法；实例方法用 @Override 防写错签名。',
        ],
      },
      { type: 'heading', level: 2, text: '四、泛型与原始类型', anchor: 'generics' },
      {
        type: 'paragraph',
        text: '避免长期用 **原始类型** `List list`（无泛型），会丢失类型检查。`List<String>` 与 `List<Integer>` 在运行时擦除，某些场景要注意 **类型安全**。',
      },
      { type: 'heading', level: 2, text: '五、异常与资源', anchor: 'exception-resources' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**受检异常**：调用声明 throws IOException 的方法，要么 try-catch 要么继续 throws。',
          '**try-with-resources**：实现了 AutoCloseable 的资源（如 InputStream）优先用 try () {} 自动关闭。',
        ],
      },
      { type: 'heading', level: 2, text: '六、工程与 Maven', anchor: 'engineering' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**package 与文件夹**：必须一致；**目录名不要用数字开头**当包名，IDE 易报包路径错误。',
          '**mainClass**：是全限定**类名**，不是 .java 文件路径。',
          '**依赖**：写在 pom 里后靠 **mvn compile** 等触发下载，不一定有单独「npm i」式命令。',
        ],
      },
      { type: 'heading', level: 2, text: '七、时间与 API 选择', anchor: 'datetime-api' },
      {
        type: 'paragraph',
        text: '新业务优先 **java.time**（LocalDateTime、ZonedDateTime），老代码里的 **java.util.Date / Calendar** 了解即可，少在新项目里当首选。',
      },
      { type: 'heading', level: 2, text: '八、并发（先有个印象）', anchor: 'concurrency-hint' },
      {
        type: 'paragraph',
        text: '**SimpleDateFormat**、部分集合**非线程安全**，多线程共享要小心。进阶再系统学 synchronized、线程池、并发集合。',
      },
      {
        type: 'tip',
        title: '学习路径',
        text: '坑清单配合你博客里的「字符串、数组、集合、异常、Maven」系列文章 + 仓库 basics 示例代码，逐项打勾验证效果最好。',
      },
    ],
  },
]
