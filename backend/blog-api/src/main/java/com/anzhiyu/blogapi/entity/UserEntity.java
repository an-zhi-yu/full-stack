package com.anzhiyu.blogapi.entity;

/**
 * 内部使用的用户实体（包含密码等敏感信息）。
 *
 * 前端视角理解：
 * - Controller / 响应 DTO 用的是不含 password 的 UserDTO
 * - Service / Repository 内部使用 UserEntity 作为真正的数据结构
 *   （将来换成数据库表时，这个类就类似于一行记录的映射）
 */
public class UserEntity {
  private String id;
  private String username;
  private String password;

  public UserEntity() {}

  public UserEntity(String id, String username, String password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}

