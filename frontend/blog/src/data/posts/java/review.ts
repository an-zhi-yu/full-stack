import type { Post } from '../../types'

/** 学习路径复盘：HelloWorld → 语法 → Maven，与博客系列对应 */
export const javaReviewPosts: Post[] = [
  {
    id: 'java-two-weeks-review',
    title: 'Java 入门两周复盘：从 HelloWorld 到 Maven',
    subtitle: '前端视角串起语法、OOP、集合异常与构建工具；附与博客文章的对应表',
    category: 'Java 后端',
    categorySlug: 'java',
    tags: ['Java', '复盘', '学习路径', 'Maven', '全栈'],
    date: '2026-03-23',
    readTime: 10,
    content: [
      {
        type: 'paragraph',
        text: '如果你和笔者一样从 **前端 / TypeScript** 转 Java，最容易卡住的往往不是「某个关键字」，而是 **心智模型**：编译期类型、JVM、classpath、Maven 坐标。本文按时间线把「两周能走完的一条合理路径」捋一遍，并 **逐条对应你博客里的文章 id**，方便复习时点开重读。',
      },
      { type: 'heading', level: 2, text: '一、第 1～3 天：跑起来 + 类型与控制流', anchor: 'week1-start' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**HelloWorld / main**：理解 `public static void main(String[] args)` 是程序入口，对标 Node 里执行某个 `index.ts`。',
          '**变量与类型**：强类型、`int` 与 `Integer`、引用类型与 `null`——对应文章 `java-variables-types`。',
          '**分支与循环**：`if / for / while / switch`，注意 **条件必须是 boolean**，对应 `java-control-flow`。',
        ],
      },
      {
        type: 'tip',
        title: '前端对照',
        text: '把 `javac` + `java` 想成「只产物的 tsc + node」：先编译出字节码，再由 JVM 执行；Maven/Gradle 再往上包一层「依赖 + 生命周期」。',
      },
      { type: 'heading', level: 2, text: '二、第 4～7 天：数组、字符串、数字与基础 OOP', anchor: 'week1-oop' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**数组**：定长、索引、遍历；`Arrays` 工具类。文章：`java-arrays`。',
          '**String**：不可变、`equals` 与 `==`、StringBuilder。文章：`java-strings`。',
          '**数学与包装类型**：`Math`、自动装箱拆箱。文章：`java-numbers-math`。',
          '**类、对象、构造、封装**：字段、方法、`private` + getter/setter。文章：`java-oop-basics`、`java-methods`。',
        ],
      },
      { type: 'heading', level: 2, text: '三、第 8～10 天：继承、接口、集合与异常', anchor: 'week2-collections' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**@Override、继承、多态**：`super`、方法重写。文章：`java-override-class-encapsulation`、`java-inheritance-super-override`。',
          '**接口与多态**：面向接口编程。文章：`java-interface-polymorphism`。',
          '**List / Map**：`ArrayList`、`HashMap`，泛型入门。文章：`java-collections-list-map`。',
          '**异常**：受检与非受检、`try-catch-finally`、`throws`。文章：`java-exception-try-catch`。',
        ],
      },
      { type: 'heading', level: 2, text: '四、第 11～14 天：Maven 与工程化习惯', anchor: 'week2-maven' },
      {
        type: 'list',
        ordered: false,
        items: [
          '**pom.xml**：`groupId` / `artifactId` / `version` 对标 npm 包名与版本；依赖 scope。文章：`java-maven-intro-pom`。',
          '**拉第三方库**：以 Gson 为例理解「坐标 + 仓库 + classpath」。文章：`java-maven-dependency-gson`。',
          '**规范与目录**：命名、包与文件夹、三种项目形态。文章：`java-style-conventions`、`java-project-structure-three`。',
          '**踩坑清单**：整数除法、字符串比较、NPE、`Arrays.asList` 等。文章：`java-beginner-pitfalls`。',
        ],
      },
      { type: 'heading', level: 2, text: '五、两周后建议的下一步', anchor: 'next' },
      {
        type: 'paragraph',
        text: '语法与 Maven 站稳后，**Spring Boot** 是多数业务后端的入口：内嵌 Tomcat、`@RestController`、JSON 自动序列化，心智上接近「带依赖注入的 Express + 约定优于配置」。仓库里 `full-stack/backend/blog-api` 与博客文章 `java-spring-boot-blog-api` 可作为第一站。',
      },
      {
        type: 'table',
        headers: ['阶段', '目标', '推荐文章 id'],
        rows: [
          ['语法打底', '能独立写小程序', 'java-variables-types → java-methods'],
          ['OOP + API', '会读简单类图与接口', 'java-inheritance-super-override → java-collections-list-map'],
          ['工程化', '会用 Maven 建项目、加依赖', 'java-maven-intro-pom → java-maven-dependency-gson'],
          ['防坑', '少踩常见运行时错误', 'java-beginner-pitfalls'],
        ],
      },
    ],
  },
]
