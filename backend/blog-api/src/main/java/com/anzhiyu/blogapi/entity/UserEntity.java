package com.anzhiyu.blogapi.entity;

/**
 * 内部使用的用户实体（包含密码等敏感信息）。
 *
 * 前端视角理解：
 * - Controller / 响应 DTO 用的是不含 password 的 UserDTO
 * - Service / Repository 内部使用 UserEntity 作为真正的数据结构
 *   （将来换成数据库表时，这个类就类似于一行记录的映射）
 */
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class UserEntity {
  private String id;
  private String username;
  private String password;
  private String email;
  private String phone;
  private String address;
  private String city;
  private String state;
  private String zip;
  private String country;
  private String website;
  private String bio;
}
