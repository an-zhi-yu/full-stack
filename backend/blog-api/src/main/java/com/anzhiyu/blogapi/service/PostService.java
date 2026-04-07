package com.anzhiyu.blogapi.service;

import com.anzhiyu.blogapi.model.dto.PostUpsertRequestDTO;
import com.anzhiyu.blogapi.model.vo.PostDetailVO;
import com.anzhiyu.blogapi.model.vo.PostListVO;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 文章业务接口：Controller 只依赖接口，实现类在 {@code service.impl}。
 */
public interface PostService {

  Page<PostListVO> listSummaries(String categorySlug, Pageable pageable);

  Optional<Long> recordView(Long postId);

  Optional<PostEngagementStore.LikeToggleResult> toggleLike(Long postId, String userId);

  Optional<PostDetailVO> getById(Long id);

  PostDetailVO create(PostUpsertRequestDTO request);

  Optional<PostDetailVO> replace(Long id, PostUpsertRequestDTO request);

  boolean delete(Long id);
}
