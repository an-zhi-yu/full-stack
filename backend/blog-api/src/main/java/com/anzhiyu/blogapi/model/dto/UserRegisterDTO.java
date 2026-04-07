package com.anzhiyu.blogapi.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * 注册请求体：与前端表单字段一一对应。
 * <p>
 * 仅在 Controller 方法参数上加了 {@code @Valid} 时，这里的 {@code @NotBlank}/{@code @Size}
 * 才会在进 Service 之前被校验；失败 → 全局异常处理 → HTTP 400（不必手写 if）。
 * </p>
 * <p>
 * 访问字段用 {@code request.username()}、{@code request.password()}（record 没有
 * {@code getXxx}）。
 * </p>
 */
public record UserRegisterDTO(
        @NotBlank(message = "用户名不能为空") @Size(min = 2, max = 32, message = "用户名长度 2～32") String username,

        @NotBlank(message = "密码不能为空") @Size(min = 6, max = 64, message = "密码长度 6～64") String password) {
}
