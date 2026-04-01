package com.anzhiyu.blogapi.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 内部使用的用户实体（包含密码等敏感信息）。
 *
 * <p>
 * 前端视角理解：
 * </p>
 * <ul>
 * <li>Controller / 响应 DTO 用的是不含 password 的
 * {@link com.anzhiyu.blogapi.dto.UserDTO}</li>
 * <li>Service / Repository 内部使用 UserEntity 作为真正的数据结构
 * （将来换成数据库表时，这个类就类似于一行记录的映射）</li>
 * </ul>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

  private String id;
  private String username;
  private String password;
  private String avatar;
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
