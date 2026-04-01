package com.anzhiyu.blogapi.controller;

import com.anzhiyu.blogapi.common.ApiResult;
import com.anzhiyu.blogapi.dto.BlogPost;
import com.anzhiyu.blogapi.dto.PostSummary;
import com.anzhiyu.blogapi.dto.PostUpsertRequest;
import com.anzhiyu.blogapi.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * 博客文章 API（给前端同学看的总览）
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 【类比 Express】
 *   下面这个类 ≈ 你写的一个 router 文件里 export 出去的一组 handler，
 *   只不过用「注解」标在方法上，而不是 app.get('/path', handler)。
 *
 * 【完整 URL 怎么拼】
 *   类上的 @RequestMapping("/api/v1/posts") 是「公共前缀」
 *   方法上的 @GetMapping、@GetMapping("/{id}") 等会拼在后面：
 *     - 只有 @GetMapping、路径里没写字符串 → 实际路径就是前缀本身 → GET /api/v1/posts
 *     - @GetMapping("/{id}") → GET /api/v1/posts/java-spring-boot-blog-api
 *
 * 【postService 是什么？数据从哪来？】
 *   postService 是 Spring 自动注入的 PostService（带 @Service）。
 *   它里面调 PostRepository，数据启动时从 classpath 里的 JSON（posts-full.json）读进内存。
 *   不是你浏览器「传」给 Controller 的；是服务端自己读文件/内存里的列表，再按 id 查找。
 *   类比：像 Node 里 const posts = require('./posts.json')，handler 里 posts.find(...)。
 *
 * 约定全文：docs/REST-博客文章API.md
 */
@RestController // 这个类里每个方法的返回值都序列化成 JSON 写到 HTTP 响应体（类似总是 res.json()）
@RequestMapping("/api/v1/posts") // 整类共用的 URL 前缀；下面每个方法的路径都挂在这后面
public class PostController {

    /*
     * 构造器注入：Spring 启动时会 new PostService（以及它的依赖），再 new 本 Controller 时把单例传进来。
     * 你不需要自己写 new PostService()。
     */
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    /*
     * ── 1）文章列表 ─────────────────────────────────────────────────────
     *
     * 【路由】@GetMapping 括号里是空的 → 路径只有类前缀 → GET /api/v1/posts
     *        不是「没写路由」，而是「路由就是 /api/v1/posts 这一层」。
     *        类比 Express：router.get('/', listHandler) 挂在 app.use('/api/v1/posts', router) 下面。
     *
     * 【查询参数】@RequestParam(required = false) String categorySlug
     *        对应 URL：/api/v1/posts?categorySlug=java
     *        类比：const categorySlug = req.query.categorySlug（可选）
     *
     * 【返回值】ApiResult<List<PostSummary>> → 统一包一层 { code, message, data: [...] }
     *        data 里每一项没有正文 content，只有标题等摘要，列表页够用、省流量。
     *
     * 【为什么这里不用 ResponseEntity，而详情 get() 用了？】
     *        列表接口只有「成功返回 200」这一种 HTTP 语义，没有「资源不存在」这种要单独用 404 表达的情况
     *        （空列表仍是 200，data: []）。Spring 对「直接返回对象」的默认行为就是 HTTP 200 + JSON。
     *        ResponseEntity 用在需要 **显式改状态码** 的接口上（404、201、204 等）。
     *        你们团队若约定「一律 200 + body.code」，也可以把下面改成 ResponseEntity.ok(ApiResult.ok(...))，效果仍是 200。
     *
     * 【ResponseEntity<ApiResult<BlogPost>> 是「多次转化」吗？】
     *        不是流水线式多次序列化。可以理解为 **一层 HTTP 信封（状态码 + 头）** 里再装 **一层业务信封 ApiResult**，
     *        再里面是 data（BlogPost）。最终 Jackson 只把「最外层返回值」整体转成一份 JSON 响应体。
     */
    @GetMapping // 等价于 @GetMapping("")：映射到「当前前缀」本身，即 /api/v1/posts
    public ApiResult<List<PostSummary>> list(@RequestParam(required = false) String categorySlug) {
        return ApiResult.ok(postService.listSummaries(categorySlug));
    }

    /*
     * ── 2）文章详情 ─────────────────────────────────────────────────────
     *
     * 【路由】@GetMapping("/{id}") → GET /api/v1/posts/{id}
     *        @PathVariable String id 把 URL 里的那一段抠出来，比如 java-spring-boot-blog-api。
     *        类比：Express router.get('/:id', (req, res) => { const { id } = req.params })
     *
     * 【为什么返回类型是 ResponseEntity<ApiResult<BlogPost>> 而不是直接 ApiResult？】
     *        REST 习惯：找不到资源时 HTTP 状态码用 404，而不只是 body 里 code: 404 但 HTTP 仍是 200。
     *        ResponseEntity 让你同时控制「状态码」和「响应体」。
     *
     * 【下面这段 Optional 链式写法在干什么？（前端对照）】
     *
     *   postService.getById(id) 在 Java 里返回 Optional<BlogPost>：
     *   可以理解为「要么有一个文章，要么是空的」，类似 TS 的 T | null 但 API 更啰嗦一点。
     *
     *   .map(p -> ResponseEntity.ok(ApiResult.ok(p)))
     *        → 若有文章：HTTP 200，body 里是 ApiResult 包好的完整文章（含 content）。
     *
     *   .orElseGet(() -> ResponseEntity.status(404).body(ApiResult.fail(...)))
     *        → 若没有：HTTP 404，body 里仍带你们前端熟悉的 { code: 404, message: ... }，方便 axios 拦截器统一处理。
     *
     *   TS 伪代码对照：
     *        const post = await findById(id);
     *        if (post) return res.status(200).json({ code: 0, data: post });
     *        return res.status(404).json({ code: 404, message: '...' });
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResult<BlogPost>> get(@PathVariable String id) {
        return postService.getById(id)
                .map(p -> ResponseEntity.ok(ApiResult.ok(p)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResult.fail(404, "文章不存在: " + id)));
    }

    /*
     * 【HTTP 状态码：201 / 204 / 404 和你们「只有 200 + 404」的区别】
     *   REST 风格里常见：201 Created（新建成功）、204 No Content（删除成功无 body）、404 资源不存在。
     *   很多国内项目会统一成：业务成功都 200，用 body 里 code 区分，只有「URL 连路由都没匹配」才 404。
     *   两种都可以，关键是 **前后端 + 网关** 约定一致。本仓库用 REST 常见码做教学示例。
     *
     * 【400 参数错误谁处理？】见 {@code ApiExceptionHandler}：JSON 解析失败、将来 @Valid 校验失败 → HTTP 400 + ApiResult。
     */
    /** POST /api/v1/posts — body JSON 见 PostUpsertRequest；HTTP 201 Created */
    @PostMapping
    public ResponseEntity<ApiResult<BlogPost>> create(@RequestBody PostUpsertRequest request) {
        BlogPost created = postService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResult.ok(created));
    }

    /** PUT /api/v1/posts/{id} — 整篇替换；没有该 id 则 404，写法和 get 一样用 Optional */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResult<BlogPost>> replace(@PathVariable String id, @RequestBody PostUpsertRequest request) {
        return postService.replace(id, request)
                .map(p -> ResponseEntity.ok(ApiResult.ok(p)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResult.fail(404, "文章不存在: " + id)));
    }

    /** DELETE /api/v1/posts/{id} — 成功 204 无 body；找不到 404 */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (!postService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
