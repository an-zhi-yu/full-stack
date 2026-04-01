# Spring 如何把 `demoProps` 传进 `FrontendLearningController`？

## 不是你手动 `new` 的

`FrontendLearningController` **不会**在你写的业务代码里被 `new` 出来。  
启动时执行的是 **`BlogApiApplication` 里的 `main` → `SpringApplication.run(...)`**。Spring 会：

1. **扫描** `com.anzhiyu.blogapi` 及其子包，找出带 `@RestController`、`@Service`、`@Configuration` 等注解的类。  
2. 为它们创建 **Bean**（由容器管理的单例对象），放进 **IoC 容器**。  
3. 发现 `FrontendLearningController` 的构造方法需要 **`AppDemoProperties`**：  
   - `AppDemoProperties` 上有 `@ConfigurationProperties(prefix = "app.demo")`  
   - 启动类上有 **`@ConfigurationPropertiesScan`**：表示「去扫带 `@ConfigurationProperties` 的类，**按 YAML 填好字段并注册成 Bean**」。若没有这个 scan，你也可以在启动类写 `@EnableConfigurationProperties(AppDemoProperties.class)`，效果类似（二选一常见）。  
4. 再创建 `FrontendLearningController` 时，容器把已存在的 **`AppDemoProperties` 实例** 作为参数传进构造方法 —— 这叫 **构造器注入（Constructor Injection）**。

**一句话**：`@ConfigurationPropertiesScan` = 把「配置绑定类」也做成可注入的 Bean，和 `@Component` 类一样进容器，只是数据来源是配置文件。

## 和前端类比

| Java / Spring | 前端类比 |
|---------------|----------|
| IoC 容器 | 框架帮你维护的一棵「单例组件树」 |
| `@RestController` | 「这个类要参与路由，请注册」 |
| 构造器注入 | 类似 `function Controller({ demoProps })`，由**框架**把依赖传进来，而不是你在业务里 `new Controller(new DemoProps())` |

## 环境变量？

YAML / `application.yml` 里的配置**不是**操作系统环境变量（虽然 Spring 也支持用 `SPRING_APPLICATION_JSON` 等覆盖）。  
常见链路是：**配置文件 → Spring Environment → `@ConfigurationProperties` / `@Value` → 注入到 Bean**。
