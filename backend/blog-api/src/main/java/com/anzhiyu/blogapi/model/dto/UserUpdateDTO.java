package com.anzhiyu.blogapi.model.dto;

import jakarta.validation.constraints.Size;

/**
 * 用户信息部分更新（PUT 常用的「补丁」风格：JSON 里<strong>没出现的字段多为 null</strong>，Service 里只对非 null
 * 覆盖）。
 * <p>
 * 若传 {@code password}：在
 * {@link com.anzhiyu.blogapi.service.impl.UserServiceJpaImpl} 里会先 BCrypt 再写入
 * {@link com.anzhiyu.blogapi.model.entity.UserEntity}，不会明文落库。
 * </p>
 * <p>
 * 前端类比：TypeScript 里「只带一部分字段」的表单对象，只提交改动的键。
 * </p>
 */
public record UserUpdateDTO(
                @Size(min = 2, max = 32, message = "用户名长度 2～32") String username,

                @Size(min = 6, max = 64, message = "新密码长度 6～64") String password,

                String email,
                String phone,
                String address,
                String city,
                String state,
                String zip,
                String country,
                String website,
                String bio) {
}
