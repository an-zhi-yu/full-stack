# Java / Spring 新手问答（前端背景）

## 1. `@ConfigurationPropertiesScan` 和「注册成 Bean」是什么意思？

**Bean** 可以粗浅理解成：交给 Spring **容器统一创建、保管**的一个**单例对象**（类似前端里全局只有一个的 `queryClient` / `store`，但由框架帮你 `new`）。

- **`@ConfigurationProperties(prefix = "app.demo")`** 标在 `AppDemoProperties` 上：告诉 Spring「把配置文件里 `app.demo.*` 绑到这个类的字段上」。
- **`@ConfigurationPropertiesScan`** 标在启动类上：告诉 Spring「去扫描包里哪些类带了 `@ConfigurationProperties`，**自动创建实例并放进容器**」。
- 之后任何类只要写 **`private final AppDemoProperties demoProps`** + **构造器参数**，Spring 在创建这个类时就会**自动把已注册好的 `AppDemoProperties` 传进去**。

所以：**不是**「环境变量直接传进类」，而是 **配置文件 → Spring 绑定成对象 → 注册成 Bean → 构造器注入**。

更短版见：[Spring依赖注入简说.md](Spring依赖注入简说.md)。

---

## 2. 不知道什么时候要 `import` 什么包，怎么办？

实用顺序：

1. **先写类名 / 注解**，IDE（IDEA / VS Code Java）会红色下划线，**Alt+Enter / Quick Fix** 选 **Import class**。
2. 看 **Spring / JDK 文档**里示例代码顶部的 import，**照抄同版本**的写法。
3. **javax.* vs jakarta.***：Spring Boot 3 起用 **jakarta**（如 `jakarta.annotation.PostConstruct`），老教程里的 `javax` 要替换。
4. 记几条高频包：  
   - `org.springframework.web.bind.annotation.*`（`@GetMapping` 等）  
   - `org.springframework.stereotype.*`（`@Service` `@RestController`）  
   - `org.springframework.beans.factory.annotation.*`（`@Value` `@Autowired`）

和前端一样：**import 的是「类型 / 注解」在编译期要可见**；用熟了主要靠 IDE + 官方示例。

---

## 3. import 了包、也写了 `@XXX`，但方法体里没写这个类名，这正常吗？

**正常。** 在 Java 里 **注解类型**也算「用到了这个类」，编译器需要 import 或全限定名。

前端类比：

- Vue `<script setup>` 里用了 **指令 / 宏**，不一定在 JS 里再写一遍名字。
- TypeScript 里 **`as SomeType`**、`satisfies SomeType` 也会用到类型，**只出现在类型位置**，运行时代码里看不到。

若 import **完全未使用**（连注解都没用），IDE 会灰显，可 **Optimize Imports** 删掉。

---

## 4. 前端改成走接口后，后端是不是要一直开着？只能手动启动吗？

- **开发时**：一般要 **同时开** `mvn spring-boot:run`（或 IDEA Run）和 `npm run dev`，前端通过 **Vite proxy** 访问 `/api`。
- **不是只能手动**：可在 IDEA 里 **Run Configuration** 一键启；或用 **`concurrently`** 一条命令启前后端；上线用 **Docker Compose** / **systemd** / 云平台托管。
- **文章数据**：改 TS 文章后执行一次 `npm run export-posts`（在 `frontend/blog`），再 **重启** blog-api，后端会重新读 `posts-full.json`。

---

## 6. 开发时 Network 里同一接口出现两次？

常见原因是 **React 18 `<StrictMode>`**（`main.tsx` 里包了的话）：开发环境会**故意**把组件「装→卸→再装」一遍，让 `useEffect` 跑两次，于是 `fetch` 也会触发两次。生产构建通常不会这样。

若已与后端合并请求仍看到两条线，可在 `blogApi.ts` 里用 **进行中的 Promise 去重**（本项目已对列表、详情做了并发合并）。去掉 StrictMode 也能消掉双请求，但会少一层官方推荐的副作用检查，一般不建议只为这个关。

---

## 5. `fetch` POST 报 400：别用 `data`，要用 `body` + `JSON.stringify`

**错误示例（浏览器没有 `data` 这个选项，且 body 必须是字符串）：**

```js
fetch('http://localhost:8080/api/learn/echo', {
  method: 'POST',
  data: { name: '张三', note: 'hello' }, // ❌
})
```

**正确：**

```js
fetch('http://localhost:8080/api/learn/echo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '张三', note: 'hello' }), // ✅
})
```

开发时推荐走 **Vite 代理**，用 **`fetch('/api/learn/echo', { ... })`**，与页面同源，少踩 CORS。
