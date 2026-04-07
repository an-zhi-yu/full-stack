package com.anzhiyu.blogapi.service.impl;

import com.anzhiyu.blogapi.common.exception.ResourceNotFoundException;
import com.anzhiyu.blogapi.common.util.BeanUtil;
import com.anzhiyu.blogapi.mapper.PostMapper;
import com.anzhiyu.blogapi.model.dto.PostUpsertRequestDTO;
import com.anzhiyu.blogapi.model.entity.PostEntity;
import com.anzhiyu.blogapi.model.vo.PostDetailVO;
import com.anzhiyu.blogapi.model.vo.PostListVO;
import com.anzhiyu.blogapi.repository.PostRepository;
import com.anzhiyu.blogapi.service.PostEngagementStore;
import com.anzhiyu.blogapi.service.PostService;

import jakarta.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

  private final PostRepository postRepository;
  private final PostEngagementStore engagement;
  private final PostMapper postMapper;

  public PostServiceImpl(PostRepository postRepository, PostEngagementStore engagement, PostMapper postMapper) {
    this.postRepository = postRepository;
    this.engagement = engagement;
    this.postMapper = postMapper;
  }

  /**
   * 查询文章列表
   * 
   * @param categorySlug
   * @param pageable
   * @return
   */
  @Override
  public Page<PostListVO> listSummaries(String categorySlug, Pageable pageable) {
    Page<PostEntity> page = postRepository.findByCategorySlug(categorySlug, pageable);
    return page.map(postMapper::toListVO); // === page.map(item -> postMapper.toListVO(item));
  }

  /**
   * 上报浏览，返回累计浏览量
   * 
   * @param postId
   * @return
   */
  @Override
  public Optional<Long> recordView(Long postId) {
    if (postRepository.findById(postId).isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(engagement.incrementViewAndGet(postId));
  }

  /**
   * 切换点赞，返回最新点赞数与是否已赞
   * 
   * @param postId
   * @param userId
   * @return
   */
  @Override
  public Optional<PostEngagementStore.LikeToggleResult> toggleLike(Long postId, String userId) {
    if (postRepository.findById(postId).isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(engagement.toggleLike(postId, userId));
  }

  /**
   * 根据ID查询文章
   * 
   * @param id
   * @return
   */
  @Override
  public Optional<PostDetailVO> get(Long id, String uid) {
    PostEntity post = postRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("文章不存在: " + id));
    return Optional.of(postMapper.toDetailVO(post));
  }

  /**
   * 创建文章
   * 
   * @param request
   * @return
   */
  @Override
  @Transactional
  public PostDetailVO create(PostUpsertRequestDTO request) {
    PostEntity post = PostEntity.builder()
        .userId(request.userId())
        .title(request.title())
        .subtitle(request.subtitle())
        .category(request.category())
        .categorySlug(request.categorySlug())
        .tags(request.tags())
        .content(request.content())
        .build();
    postRepository.save(post);
    return postMapper.toDetailVO(post);
  }

  /**
   * 替换文章
   * 
   * @param id
   * @param request
   * @return
   */
  @Override
  @Transactional
  public Optional<PostDetailVO> replace(Long id, PostUpsertRequestDTO dto) {
    PostEntity entity = postRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("文章不存在: " + id));
    BeanUtil.copyNonNullProperties(dto, entity);
    postRepository.save(entity);
    return Optional.of(postMapper.toDetailVO(entity));
  }

  /**
   * 删除文章
   * 
   * @param id
   * @return
   */
  @Override
  @Transactional
  public boolean delete(Long id) {
    PostEntity entity = postRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("文章不存在: " + id));
    entity.setIsDeleted(1);
    postRepository.save(entity);
    return true;
  }
}
