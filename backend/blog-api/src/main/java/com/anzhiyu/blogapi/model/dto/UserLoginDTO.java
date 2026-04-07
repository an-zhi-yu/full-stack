package com.anzhiyu.blogapi.model.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * 登录请求体（只含账号密码，与「登录成功后返回的 {@link UserDTO}」不是同一种类型）。
 */
public record UserLoginDTO(
        @NotBlank(message = "用户名不能为空") String username,
        @NotBlank(message = "密码不能为空") String password) {
}
