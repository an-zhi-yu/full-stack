package com.anzhiyu.blogapi.dto;

import java.util.List;

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * PostSummary —— 列表接口用的「瘦身版文章」
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 【为什么不用完整的 BlogPost？】
 *   文章正文 content 可能很长（很多块）。列表页只需要标题、分类、标签等，
 *   全量返回会浪费带宽、拖慢首屏。所以单独定义一个 **只有摘要字段** 的类型。
 *
 *   类比前端：列表用 { id, title, excerpt }，点进详情再请求完整 Post。
 *
 * 【record 是什么？】
 *   Java 16+ 的不可变数据载体，编译器自动生成构造方法、getter（如 title()）、equals/hashCode。
 *   Jackson 序列化成 JSON 时字段名与这里组件名对应（如 categorySlug → "categorySlug"）。
 */
public record PostSummary(
        String id,
        String title,
        String subtitle,
        String category,
        String categorySlug,
        List<String> tags,
        String date,
        int readTime,
        Boolean pinned
) {
}
