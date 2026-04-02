package com.anzhiyu.blogapi.dto;

/**
 * 暴露给前端的用户视图（与 {@link com.anzhiyu.blogapi.entity.UserEntity} 业务字段对齐，<strong>不含 password</strong>）。
 * <p>MapStruct 从 Entity 映射到本 record；JSON 序列化后字段名与这里组件名一致（如 {@code username}）。</p>
 * <p>代码里取值用 {@code user.id()}、{@code user.username()}，没有 {@code getId()}（那是 JavaBean / Lombok 习惯）。</p>
 */
public record UserDTO(
    String id,
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
    String bio) {
}
