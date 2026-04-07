package com.anzhiyu.blogapi.model.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.Type;

import com.anzhiyu.blogapi.model.common.PostContent;
import com.vladmihalcea.hibernate.type.json.JsonType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "t_post")
public class PostEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long userId; // 作者ID
  private String title; // 标题
  private String subtitle; // 副标题
  private String category; // 分类名
  private String categorySlug; // 分类URL

  @Column(columnDefinition = "LONGTEXT")
  @Type(JsonType.class)
  private List<String> tags; // JSON字符串存储（数据库里是JSON类型）

  @Column(columnDefinition = "LONGTEXT")
  @Type(JsonType.class)
  private List<PostContent> content; // 文章内容 LONGTEXT

  private LocalDateTime date;
  private Integer readTime;
  private Integer pinned; // 是否置顶
  private Integer viewCount; // 浏览量
  private Integer likeCount; // 点赞数
  private Integer status; // 状态 0草稿 1发布

  // 审计字段
  private LocalDateTime createTime;
  private LocalDateTime updateTime;
  private Integer isDeleted;
  private Integer version;
}
