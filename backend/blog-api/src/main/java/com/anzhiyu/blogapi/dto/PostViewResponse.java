package com.anzhiyu.blogapi.dto;

/** POST /posts/{id}/view 返回当前累计浏览量 */
public record PostViewResponse(long viewCount) {
}
