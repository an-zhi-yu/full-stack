package com.anzhiyu.blogapi.repository;

import com.anzhiyu.blogapi.dto.BlogPost;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * PostRepository —— 「数据从哪来、存在哪」（前端视角）
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 【这一层在干什么？】
 *   只负责「怎么存、怎么取」文章，**不管** URL、HTTP、JSON 外壳。
 *   类比前端：一个 module 里 export const db = new Map() + loadFromJson()，
 *   不直接写在 React 组件里。
 *
 * 【@Repository】
 *   告诉 Spring：这是数据访问组件，会注册成 Bean，供 PostService 注入使用。
 *   （与 JPA 的 Repository 同名习惯，这里没有用数据库，只是内存 + JSON 文件。）
 */
@Repository
public class PostRepository {

    private final ObjectMapper objectMapper;

    /*
     * 【文章存在哪？】
     *   ConcurrentHashMap<String, BlogPost> byId —— key 是文章 id，value 是整篇文章对象。
     *   完全在 **JVM 堆内存** 里，和前端「页面里的 let cache = {}」一样是进程内变量。
     *
     * 【增删改之后数据去哪了？】
     *   只改这个 Map；**不会**自动写回 posts-full.json 文件。
     *   **重启服务** 后：@PostConstruct 会重新读 JSON，内存里的修改全部丢失（学习用 demo）。
     *   生产环境要持久化 → 换 MySQL / Redis 等，这一层改成 JDBC 或 Spring Data。
     */
    private final Map<String, BlogPost> byId = new ConcurrentHashMap<>();

    public PostRepository(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /*
     * 【loadSampleData 什么时候执行？为什么你没看到有人调用它？】
     *
     *   @PostConstruct 是 Jakarta（原 javax）提供的注解：
     *   Spring 创建好 **本 Bean**（PostRepository）、做完构造器注入之后，
     *   **会自动调用** 标了 @PostConstruct 的方法**一次**。
     *
     *   所以不是「魔法」，而是框架约定：初始化回调 ≈ React useEffect(..., []) 只在挂载后跑一次，
     *   只不过这里是服务端单例 Bean 的「出生后第一件事」。
     *
     * 【JSON 从哪读？】
     *   ClassPathResource("data/posts-full.json") 表示从 **classpath**（最终打在 jar 里的
     *   src/main/resources/）下找文件。若不存在则用 sample-posts.json。
     */
    @PostConstruct
    public void loadSampleData() throws IOException {
        ClassPathResource full = new ClassPathResource("data/posts-full.json");
        ClassPathResource sample = new ClassPathResource("data/sample-posts.json");
        ClassPathResource resource = full.exists() ? full : sample;
        try (InputStream in = resource.getInputStream()) {
            List<BlogPost> list = objectMapper.readValue(in, new TypeReference<>() {
            });
            for (BlogPost p : list) {
                byId.put(p.id(), p);
            }
        }
    }

    public List<BlogPost> findAll() {
        return List.copyOf(byId.values());
    }

    /** 按分类过滤；categorySlug 为 null 或空白时视为「不过滤」 */
    public List<BlogPost> findByCategorySlug(String categorySlug) {
        return byId.values().stream()
                .filter(p -> categorySlug == null || categorySlug.isBlank() || categorySlug.equals(p.categorySlug()))
                .collect(Collectors.toList());
    }

    public Optional<BlogPost> findById(String id) {
        return Optional.ofNullable(byId.get(id));
    }

    /** 新增或覆盖同 id 的文章，只改内存 Map */
    public void save(BlogPost post) {
        byId.put(post.id(), post);
    }

    /** 删除成功返回 true；id 不存在返回 false */
    public boolean deleteById(String id) {
        return byId.remove(id) != null;
    }
}
