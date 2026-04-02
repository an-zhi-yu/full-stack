package com.anzhiyu.blogapi.service.impl;

import com.anzhiyu.blogapi.dto.BlogPost;
import com.anzhiyu.blogapi.dto.BlogPostDetailDTO;
import com.anzhiyu.blogapi.dto.PostSummary;
import com.anzhiyu.blogapi.dto.PostUpsertRequest;
import com.anzhiyu.blogapi.repository.PostRepository;
import com.anzhiyu.blogapi.service.PostEngagementStore;
import com.anzhiyu.blogapi.service.PostService;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PostServiceImpl implements PostService {

  private final PostRepository postRepository;
  private final PostEngagementStore engagement;

  public PostServiceImpl(PostRepository postRepository, PostEngagementStore engagement) {
    this.postRepository = postRepository;
    this.engagement = engagement;
  }

  @Override
  public List<PostSummary> listSummaries(String categorySlug) {
    return postRepository.findByCategorySlug(categorySlug).stream()
        .sorted(Comparator.comparing(BlogPost::date).reversed())
        .map(this::toSummary)
        .toList();
  }

  private PostSummary toSummary(BlogPost p) {
    return new PostSummary(
        p.id(),
        p.title(),
        p.subtitle(),
        p.category(),
        p.categorySlug(),
        p.tags(),
        p.date(),
        p.readTime(),
        p.pinned(),
        engagement.getViewCount(p.id()),
        engagement.getLikeCount(p.id()));
  }

  @Override
  public Optional<BlogPostDetailDTO> getDetailById(String id, String uidOrNull) {
    return postRepository.findById(id).map(post -> {
      long v = engagement.getViewCount(post.id());
      long l = engagement.getLikeCount(post.id());
      boolean liked = uidOrNull != null && engagement.isLikedBy(post.id(), uidOrNull);
      return new BlogPostDetailDTO(post, v, l, liked);
    });
  }

  @Override
  public Optional<Long> recordView(String postId) {
    if (postRepository.findById(postId).isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(engagement.incrementViewAndGet(postId));
  }

  @Override
  public Optional<PostEngagementStore.LikeToggleResult> toggleLike(String postId, String userId) {
    if (postRepository.findById(postId).isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(engagement.toggleLike(postId, userId));
  }

  @Override
  public Optional<BlogPost> getById(String id) {
    return postRepository.findById(id);
  }

  @Override
  public BlogPost create(PostUpsertRequest request) {
    String id = "post-" + UUID.randomUUID().toString().replace("-", "").substring(0, 12);
    BlogPost post = request.withId(id);
    postRepository.save(post);
    return post;
  }

  @Override
  public Optional<BlogPost> replace(String id, PostUpsertRequest request) {
    if (postRepository.findById(id).isEmpty()) {
      return Optional.empty();
    }
    BlogPost post = request.withId(id);
    postRepository.save(post);
    return Optional.of(post);
  }

  @Override
  public boolean delete(String id) {
    return postRepository.deleteById(id);
  }
}
