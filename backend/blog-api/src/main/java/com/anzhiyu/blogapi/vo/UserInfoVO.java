package com.anzhiyu.blogapi.vo;

import java.time.LocalDateTime;

public record UserInfoVO(
    Long id,
    String username,
    String email,
    String avatar,
    String phone,
    String address,
    String city,
    String state,
    String zip,
    String country,
    String website,
    String bio,
    String role, // 角色 admin, user
    LocalDateTime createdTime, // 创建时间
    LocalDateTime updatedTime // 更新时间
) {
}
