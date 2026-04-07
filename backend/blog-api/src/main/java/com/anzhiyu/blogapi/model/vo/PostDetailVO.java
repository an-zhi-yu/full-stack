package com.anzhiyu.blogapi.model.vo;

import java.util.List;

import com.anzhiyu.blogapi.model.common.PostContent;

public record PostDetailVO(
                Long id,
                String title,
                String subtitle,
                String category,
                String categorySlug,
                List<String> tags,
                List<PostContent> content,
                String date,
                Integer readTime,
                Integer pinned,
                Integer viewCount,
                Integer likeCount,
                Boolean likedByCurrentUser) {

}
