package com.anzhiyu.blogapi.vo;

import java.util.List;

public record PostListVO(
    Long id,
    String title,
    String subtitle,
    String category,
    String categorySlug,
    List<String> tags,
    String date,
    Integer readTime,
    Integer pinned,
    Integer viewCount,
    Integer likeCount) {
}
