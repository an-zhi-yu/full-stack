package com.anzhiyu.blogapi.dto;

import com.fasterxml.jackson.databind.JsonNode;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

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
 *
 * 【@NotBlank / @NotNull 与 Controller 里的 @Valid】
 *   类比：DTO 像 Zod schema，@Valid 像 .parse(body)；失败由全局异常处理成 HTTP 400，
 *   不必在每个方法里手写 if (!title) return 400。
 */
public record PostUpsertRequest(
        @NotBlank(message = "title 不能为空")
        String title,

        String subtitle,

        @NotBlank(message = "category 不能为空")
        String category,

        @NotBlank(message = "categorySlug 不能为空")
        String categorySlug,

        @NotNull(message = "tags 不能为 null")
        List<String> tags,

        @NotBlank(message = "date 不能为空")
        String date,

        @Min(value = 0, message = "readTime 不能为负")
        int readTime,

        Boolean pinned,

        @NotNull(message = "content 不能为 null")
        JsonNode content
) {

    public BlogPost withId(String id) {
        return new BlogPost(id, title, subtitle, category, categorySlug, tags, date, readTime, pinned, content);
    }
}
