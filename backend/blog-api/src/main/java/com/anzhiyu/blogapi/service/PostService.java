package com.anzhiyu.blogapi.service;

import com.anzhiyu.blogapi.dto.BlogPost;
import com.anzhiyu.blogapi.dto.BlogPostDetailDTO;
import com.anzhiyu.blogapi.dto.PostSummary;
import com.anzhiyu.blogapi.dto.PostUpsertRequest;
import com.anzhiyu.blogapi.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * PostService —— 「业务规则层」（前端视角）
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 【为什么要这一层？Controller 直接调 Repository 不行吗？】
 *   可以，但项目一大就会臃肿。**分层**习惯是：
 *     Controller：只接 HTTP（路径、参数、状态码），尽量薄。
 *     Service：编排业务——排序、生成 id、判断存在与否、以后加权限/日志也放这里。
 *     Repository：只关心数据怎么读写（这里是内存 Map；换数据库时主要改这层）。
 *
 *   类比前端：
 *     Controller ≈ 路由 handler 只调一个 api.xxx()
 *     Service ≈ 你写在 hooks 或 service 里的「业务函数」
 *     Repository ≈ 封装 fetch/localStorage 的那一层
 *
 * 【@Service】
 *   与 @Repository / @RestController 一样，都是 @Component 的特化，会被 Spring 扫描并注入。
 */
@Service
public class PostService {

    private final PostRepository postRepository;
    private final PostEngagementStore engagement;

    public PostService(PostRepository postRepository, PostEngagementStore engagement) {
        this.postRepository = postRepository;
        this.engagement = engagement;
    }

    /** 列表：可选按分类筛、按日期倒序；摘要附带当前累计浏览量、点赞数 */
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

    /**
     * 详情：正文 + 互动数据；uid 可为 null（匿名），有则计算 likedByCurrentUser。
     */
    public Optional<BlogPostDetailDTO> getDetailById(String id, String uidOrNull) {
        return postRepository.findById(id).map(post -> {
            long v = engagement.getViewCount(post.id());
            long l = engagement.getLikeCount(post.id());
            boolean liked = uidOrNull != null && engagement.isLikedBy(post.id(), uidOrNull);
            return new BlogPostDetailDTO(post, v, l, liked);
        });
    }

    /** 浏览 +1；文章不存在则 empty */
    public Optional<Long> recordView(String postId) {
        if (postRepository.findById(postId).isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(engagement.incrementViewAndGet(postId));
    }

    /** 切换点赞；文章不存在则 empty */
    public Optional<PostEngagementStore.LikeToggleResult> toggleLike(String postId, String userId) {
        if (postRepository.findById(postId).isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(engagement.toggleLike(postId, userId));
    }

    public Optional<BlogPost> getById(String id) {
        return postRepository.findById(id);
    }

    /** 新建：服务端生成 id，再写入 Repository */
    public BlogPost create(PostUpsertRequest request) {
        String id = "post-" + UUID.randomUUID().toString().replace("-", "").substring(0, 12);
        BlogPost post = request.withId(id);
        postRepository.save(post);
        return post;
    }

    /** 全量替换：没有该 id 则返回 empty，由 Controller 决定返回 404 */
    public Optional<BlogPost> replace(String id, PostUpsertRequest request) {
        if (postRepository.findById(id).isEmpty()) {
            return Optional.empty();
        }
        BlogPost post = request.withId(id);
        postRepository.save(post);
        return Optional.of(post);
    }

    public boolean delete(String id) {
        return postRepository.deleteById(id);
    }
}
