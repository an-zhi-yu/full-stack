package com.anzhiyu.blogapi.model.vo;

/**
 * 点赞切换接口的响应体：最新点赞数 + 当前用户是否已赞。
 */
public record PostLikeResponseVO(long likeCount, boolean likedByCurrentUser) {
}
