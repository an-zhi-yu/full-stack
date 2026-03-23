package com.anzhiyu.blogapi.common;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * 统一 API 响应体，对标前端 axios 拦截器里约定的 { code, message, data }。
 *
 * @param code    业务码，0 表示成功（也可改用 200，团队统一即可）
 * @param message 提示文案
 * @param data    载荷；失败且无数据时为 null，序列化时可省略
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResult<T>(int code, String message, T data) {

    public static <T> ApiResult<T> ok(T data) {
        return new ApiResult<>(0, "ok", data);
    }

    public static <T> ApiResult<T> ok(String message, T data) {
        return new ApiResult<>(0, message, data);
    }

    public static <T> ApiResult<T> fail(int code, String message) {
        return new ApiResult<>(code, message, null);
    }
}
