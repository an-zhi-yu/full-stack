package com.anzhiyu.blogapi.service;

import com.anzhiyu.blogapi.dto.BlogPost;
import com.anzhiyu.blogapi.dto.BlogPostDetailDTO;
import com.anzhiyu.blogapi.dto.PostSummary;
import com.anzhiyu.blogapi.dto.PostUpsertRequest;

import java.util.List;
import java.util.Optional;

/**
 * 文章业务接口：Controller 只依赖接口，实现类在 {@code service.impl}。
 */
public interface PostService {

  List<PostSummary> listSummaries(String categorySlug);

  Optional<BlogPostDetailDTO> getDetailById(String id, String uidOrNull);

  Optional<Long> recordView(String postId);

  Optional<PostEngagementStore.LikeToggleResult> toggleLike(String postId, String userId);

  Optional<BlogPost> getById(String id);

  BlogPost create(PostUpsertRequest request);

  Optional<BlogPost> replace(String id, PostUpsertRequest request);

  boolean delete(String id);
}
