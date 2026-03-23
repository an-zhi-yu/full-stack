package com.anzhiyu.blogapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * POST JSON 请求体示例（字段名与 JSON 一致：camelCase）。
 * <p>
 * 请求示例：{@code {"name":"张三","note":"测试"}}
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record EchoBody(
        String name,
        String note
) {
}
