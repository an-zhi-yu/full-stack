package com.anzhiyu.blogapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.anzhiyu.blogapi.model.entity.PostEntity;

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * PostRepository —— 「数据从哪来、存在哪」（前端视角）
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 【这一层在干什么？】
 *   只负责「怎么存、怎么取」文章，**不管** URL、HTTP、JSON 外壳。
 *   类比前端：一个 module 里 export const db = new Map() + loadFromJson()，
 *   不直接写在 React 组件里。
 *
 * 【@Repository】
 *   告诉 Spring：这是数据访问组件，会注册成 Bean，供 PostService 注入使用。
 *   （与 JPA 的 Repository 同名习惯，这里没有用数据库，只是内存 + JSON 文件。）
 */
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
    Page<PostEntity> findByCategorySlug(String categorySlug, Pageable pageable);
}
