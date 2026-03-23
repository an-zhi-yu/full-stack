package com.anzhiyu.blogapi.dto;

/**
 * 健康检查返回体（示例 DTO）。
 * <p>
 * 使用 {@code record}：编译器自动生成构造方法、getter（如 {@code status()}）、equals/hashCode。
 * Jackson 会把它序列化成 JSON 字段名 {@code status}，与前端看到的对象形状一致。
 * <p>
 * 若字段多、需要可变或继承，可改成普通 class + 私有字段 + getter/setter（或 Lombok）。
 */
public record HealthPayload(String status) {
}
