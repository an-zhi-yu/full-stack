package com.anzhiyu.blogapi.vo;

/**
 * 登录成功响应：JWT + 用户信息（无密码）。
 */
public record UserLoginResponseVO(String token, UserInfoVO user) {
}
