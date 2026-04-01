package com.anzhiyu.blogapi.dto;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

/**
 * 文章详情 API 响应：正文字段与 {@link BlogPost} 一致（Jackson 展开到同一层），
 * 另附浏览量、点赞数、当前用户是否已赞。
 */
public class BlogPostDetailDTO {

  @JsonUnwrapped
  private final BlogPost post;

  private final long viewCount;
  private final long likeCount;
  private final boolean likedByCurrentUser;

  public BlogPostDetailDTO(BlogPost post, long viewCount, long likeCount, boolean likedByCurrentUser) {
    this.post = post;
    this.viewCount = viewCount;
    this.likeCount = likeCount;
    this.likedByCurrentUser = likedByCurrentUser;
  }

  public BlogPost getPost() {
    return post;
  }

  public long getViewCount() {
    return viewCount;
  }

  public long getLikeCount() {
    return likeCount;
  }

  public boolean isLikedByCurrentUser() {
    return likedByCurrentUser;
  }
}
