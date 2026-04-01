package com.anzhiyu.blogapi.dto;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

/**
 * 与前端 {@code Post} 对齐的文章资源；{@code content} 用 JsonNode 承接任意块结构。
 */
public record BlogPost(
        String id,
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

    public PostSummary toSummary() {
        return new PostSummary(id, title, subtitle, category, categorySlug, tags, date, readTime, pinned);
    }
}
