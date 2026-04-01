package com.anzhiyu.blogapi.dto;

/** POST /posts/{id}/like 切换点赞后的状态 */
public record PostLikeResponse(long likeCount, boolean likedByCurrentUser) {
}
