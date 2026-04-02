package com.anzhiyu.blogapi.vo;

import java.util.List;

public record PostDetailVO(
        Long id,
        String title,
        String subtitle,
        String category,
        String categorySlug,
        List<String> tags,
        List<PostContentBlockVO> content,
        String date,
        Integer readTime,
        Integer pinned,
        Integer viewCount,
        Integer likeCount,
        Boolean likedByCurrentUser) {

}
