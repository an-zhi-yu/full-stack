package com.anzhiyu.blogapi.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
// 实体类注解
@Entity
// 表注解
@Table(name = "t_user")
public class UserEntity {

  // 主键注解
  @Id
  // 主键生成策略注解 IDENTITY 表示使用数据库自增策略 对应 MySQL AUTO_INCREMENT
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

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
  // 扩展字段
  private String role;
  private Integer status;
  // 审记字段
  private LocalDateTime createdTime;
  private LocalDateTime updatedTime;
  private Integer isDeleted;
  private Integer version;
}
