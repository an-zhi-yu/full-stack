package com.anzhiyu.blogapi.service.impl;

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
   * 根据主键查详情。
   *
   * <p>
   * <strong>为什么不能直接 {@code return postMapper.toDetailVO(entity)}？</strong>
   * {@link com.anzhiyu.blogapi.mapper.PostMapper#toDetailVO(PostEntity)} 只做「实体字段 → VO」的静态拷贝：
   * 浏览量/点赞数在库里有一份（{@code PostEntity}），但本项目的 {@link PostEngagementStore} 还在内存里维护了
   * 上报浏览、点赞切换的计数；详情里展示的数值需要把两边<strong>合并</strong>（否则前端会看到与「刚点过赞/刚刷过浏览」不一致）。
   * 另外 {@code likedByCurrentUser} 依赖<strong>当前请求的 uid</strong>（JWT），实体里没有这个信息，必须在 Service 里用
   * {@code engagement.isLikedBy(postId, uid)} 算出来，再 {@code new PostDetailVO(...)} 覆盖 Mapper 里的占位值。
   * </p>
   *
   * <p>
   * {@link #create} / {@link #replace} 仍可直接 {@code toDetailVO}：那是写操作返回的「当前库内快照」，与「带内存态互动的读详情」场景不同；
   * 若你希望创建后立即看到与详情接口完全一致的计数，也可以再抽一层合并逻辑（当前未做）。
   * </p>
   */
  @Override
  public Optional<PostDetailVO> getDetailById(Long id, String uid) {
    return postRepository.findById(id).map(entity -> toDetailWithEngagement(entity, uid));
  }

  /**
   * 先走 MapStruct 得到标题、正文等「纯库表字段」，再叠加 {@link PostEngagementStore} 与当前用户点赞态。
   */
  private PostDetailVO toDetailWithEngagement(PostEntity entity, String uid) {
    PostDetailVO base = postMapper.toDetailVO(entity);
    long extraViews = engagement.getViewCount(entity.getId());
    long memLikes = engagement.getLikeCount(entity.getId());
    int baseView = entity.getViewCount() != null ? entity.getViewCount() : 0;
    int baseLike = entity.getLikeCount() != null ? entity.getLikeCount() : 0;
    int viewCount = (int) Math.min(Integer.MAX_VALUE, (long) baseView + extraViews);
    int likeCount = (int) Math.max(baseLike, memLikes);
    boolean liked = uid != null && !uid.isBlank() && engagement.isLikedBy(entity.getId(), uid);
    return new PostDetailVO(
        base.id(),
        base.title(),
        base.subtitle(),
        base.category(),
        base.categorySlug(),
        base.tags(),
        base.content(),
        base.date(),
        base.readTime(),
        base.pinned(),
        viewCount,
        likeCount,
        liked);
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
    return postRepository.findById(id).map(entity -> {
      BeanUtil.copyNonNullProperties(dto, entity);
      postRepository.save(entity);
      return postMapper.toDetailVO(entity);
    });
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
    return postRepository
        .findById(id)
        .map(
            entity -> {
              entity.setIsDeleted(1);
              postRepository.save(entity);
              return true;
            })
        .orElse(false);
  }
}
