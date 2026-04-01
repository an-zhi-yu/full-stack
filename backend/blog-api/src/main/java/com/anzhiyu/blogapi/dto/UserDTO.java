package com.anzhiyu.blogapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 暴露给前端的用户视图：字段与 {@link com.anzhiyu.blogapi.entity.UserEntity} 对齐，但不包含
 * password。
 * MapStruct / JSON 序列化时自然不会出现密码字段。
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
  private String id;
  private String username;
  private String email;
  private String avatar;
  private String phone;
  private String address;
  private String city;
  private String state;
  private String zip;
  private String country;
  private String website;
  private String bio;
}
