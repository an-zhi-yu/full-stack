package com.anzhiyu.blogapi.repository;

import org.springframework.stereotype.Repository;

import com.anzhiyu.blogapi.model.entity.UserEntity;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  // Optional<UserEntity> 表示查询结果可能为空, 需要你对其进行处理
  // 查询用户是否存在 等价于 SELECT * FROM t_user WHERE username = ?
  Optional<UserEntity> findByUsername(String username);

  // 查询用户是否存在 等价于 SELECT COUNT(*) > 0 FROM t_user WHERE username = ?
  boolean existsByUsername(String username);

  // 分页查询用户 等价于 SELECT * FROM t_user LIMIT ? OFFSET ?
  Page<UserEntity> findAll(Pageable pageable);
}
