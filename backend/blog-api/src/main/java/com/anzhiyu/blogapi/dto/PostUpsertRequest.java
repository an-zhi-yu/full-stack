package com.anzhiyu.blogapi.dto;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * PostUpsertRequest —— 写接口的请求体形状（POST 新建 / PUT 替换）
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 【为什么没有 id 字段？】
 *   POST 新建时 id 由服务端 PostService 用 UUID 生成；
 *   PUT 时 id 来自 URL 路径 /api/v1/posts/{id}，body 里不必重复（避免不一致）。
 *
 * 【content 为什么是 JsonNode？】
 *   正文是多种块（paragraph、heading、code…）组成的数组，用 JsonNode 承接任意 JSON 结构，
 *   避免为每种块再写一堆 Java 子类（和前端 ContentBlock 联合类型类似，服务端先宽松接收）。
 *
 * 【withId】
 *   把「请求体 + 确定的 id」合成一个完整的 BlogPost，好交给 Repository 保存。
 */
public record PostUpsertRequest(
        String title,
        String subtitle,
        String category,
        String categorySlug,
        List<String> tags,
        String date,
        int readTime,
        Boolean pinned,
        JsonNode content
) {

    public BlogPost withId(String id) {
        return new BlogPost(id, title, subtitle, category, categorySlug, tags, date, readTime, pinned, content);
    }
}
