package com.anzhiyu.blogapi.vo;

import java.time.LocalDateTime;

public record UserListVO(
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
    String role,
    LocalDateTime createdTime,
    LocalDateTime updatedTime) {

}
