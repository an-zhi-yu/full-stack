package com.anzhiyu.blogapi.service;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.LongAdder;

import org.springframework.stereotype.Component;

/**
 * 文章浏览 / 点赞的进程内存储（内存态，重启清零）。
 *
 * <p>前端类比：在 Node 里用两个 Map：postId → 浏览次数、postId → Set&lt;userId&gt; 点赞人集合。</p>
 */
@Component
public class PostEngagementStore {

  private final ConcurrentHashMap<String, LongAdder> viewCountByPostId = new ConcurrentHashMap<>();
  /** postId → 点过赞的用户 id（与 JWT 里 uid 一致） */
  private final ConcurrentHashMap<String, Set<String>> likerIdsByPostId = new ConcurrentHashMap<>();

  /** 上报一次浏览，返回累计浏览量 */
  public long incrementViewAndGet(String postId) {
    LongAdder adder = viewCountByPostId.computeIfAbsent(postId, k -> new LongAdder());
    adder.increment();
    return adder.sum();
  }

  public long getViewCount(String postId) {
    LongAdder adder = viewCountByPostId.get(postId);
    return adder == null ? 0L : adder.sum();
  }

  public long getLikeCount(String postId) {
    Set<String> set = likerIdsByPostId.get(postId);
    return set == null ? 0L : set.size();
  }

  public boolean isLikedBy(String postId, String userId) {
    Set<String> set = likerIdsByPostId.get(postId);
    return set != null && set.contains(userId);
  }

  /**
   * 切换点赞状态：已赞则取消，未赞则点赞；返回最新点赞数与是否已赞。
   */
  public LikeToggleResult toggleLike(String postId, String userId) {
    Set<String> set = likerIdsByPostId.computeIfAbsent(postId, k -> ConcurrentHashMap.newKeySet());
    if (set.contains(userId)) {
      set.remove(userId);
      return new LikeToggleResult(set.size(), false);
    }
    set.add(userId);
    return new LikeToggleResult(set.size(), true);
  }

  public record LikeToggleResult(long likeCount, boolean likedByCurrentUser) {
  }
}
