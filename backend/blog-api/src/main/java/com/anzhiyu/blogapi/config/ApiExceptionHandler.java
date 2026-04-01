package com.anzhiyu.blogapi.config;

import com.anzhiyu.blogapi.common.ApiResult;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常 → 统一 HTTP 状态 + {@link ApiResult} 响应体（方便前端拦截器）。
 * <p>
 * 【400 从哪来？】本项目中常见两类：
 * <ul>
 *   <li>请求体不是合法 JSON、或类型对不上（如该数字却传了字符串）→ {@link HttpMessageNotReadableException}</li>
 *   <li>将来在参数上加 {@code @Valid} + jakarta 校验注解后，字段不合法 → {@link MethodArgumentNotValidException}</li>
 * </ul>
 * 若团队约定「业务上永远 HTTP 200，只靠 body.code」也可以在这里改成 {@code ok().body(ApiResult.fail(400,...))}。
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResult<Void>> handleBadJson(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest()
                .body(ApiResult.fail(400, "请求体 JSON 无法解析或字段类型不匹配"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResult<Void>> handleValidation(MethodArgumentNotValidException ex) {
        String msg = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .findFirst()
                .orElse("参数校验失败");
        return ResponseEntity.badRequest()
                .body(ApiResult.fail(400, msg));
    }
}
