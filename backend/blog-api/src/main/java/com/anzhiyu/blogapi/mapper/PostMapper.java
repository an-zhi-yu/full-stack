package com.anzhiyu.blogapi.mapper;

import java.time.LocalDateTime;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.anzhiyu.blogapi.model.entity.PostEntity;
import com.anzhiyu.blogapi.model.vo.PostDetailVO;
import com.anzhiyu.blogapi.model.vo.PostListVO;

/**
 * {@link PostEntity} → 列表/详情 {@link PostListVO}、{@link PostDetailVO} 的映射。
 *
 * <p>
 * <strong>为什么比 {@link UserMapper}「啰嗦」？</strong>
 * {@link com.anzhiyu.blogapi.model.entity.UserEntity} 与 {@link com.anzhiyu.blogapi.model.vo.UserInfoVO}
 * 字段大多是「同名 + 同类型」（例如都是 {@code String}、{@code LocalDateTime}），MapStruct 按名字自动对上就够。
 * 文章这边有两类额外情况：
 * </p>
 * <ul>
 * <li><strong>类型不一致：</strong>{@code PostEntity.date} 是 {@link LocalDateTime}，而 VO 里为了 JSON
 * 展示用的是 {@link String}。MapStruct 不会凭空猜格式，需要在接口里提供一个
 * {@code LocalDateTime → String} 的转换方法（下面的 {@link #map(LocalDateTime)}），它会参与生成代码里的赋值。</li>
 * <li><strong>目标里有、实体里没有的字段：</strong>{@link PostDetailVO} 带有 {@code likedByCurrentUser}（当前登录用户是否点过赞），
 * 数据库实体上根本没有这一列——它依赖请求里的 uid + {@link com.anzhiyu.blogapi.service.PostEngagementStore} 在 Service 层计算。
 * 映射阶段必须先给 MapStruct 一个「占位值」，否则生成实现类时会报未映射属性；这里用
 * {@code @Mapping(..., constant = "false")} 表示「先填 false」，真实值在
 * {@link com.anzhiyu.blogapi.service.impl.PostServiceImpl#getDetailById(Long, String)} 里再覆盖。</li>
 * </ul>
 *
 * <p>
 * {@code @Mapping(target = "date", source = "date")}：显式指明用实体字段 {@code date} 填 VO 的 {@code date}；
 * 因两侧类型不同，会走上面的 {@link #map(LocalDateTime)}。若省略，在部分版本/配置下 MapStruct 仍可能推断成功，
 * 写上可读性更好（一眼能看出「日期字段专门做了转换」）。
 * </p>
 *
 * <p>
 * <strong>MapStruct 不能「自动」把 {@link LocalDateTime} 变成 {@link String} 吗？</strong>
 * 官方没有内置一种<strong>约定好的字符串格式</strong>（ISO-8601、只取日期、时区等都要业务决定），因此不会像
 * Spring 转换器那样默认帮你调 {@code toString()}。常见做法：① 当前这样写一个 default 转换方法；② 或把 VO 里的
 * {@code date} 也改成 {@code LocalDateTime}，由 Jackson 在返回 JSON 时再序列化成字符串（可少写 Mapper 里的转换）。
 * </p>
 *
 * <p>
 * <strong>{@code PostEntity} 里要不要加 {@code likedByCurrentUser}？</strong>
 * <strong>不要当成数据库列：</strong>它不是「文章自身的属性」，而是「<em>当前请求的用户</em> 是否给这篇文章点过赞」，
 * 同一篇文章对不同用户值不同，写进 {@code t_post} 一行里无法表达。若仅为 MapStruct 对称而加字段，更合理的是
 * {@code @Transient} 并在 Service 里先赋值再 map，但那样仍要在 Service 用 {@code PostEngagementStore} 计算一遍，
 * 实体还会混入「仅接口用的展示字段」，一般不如现在这样：占位在 Mapper、真相在 {@code getDetailById}。
 * </p>
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {

  @Mapping(target = "date", source = "date")
  PostListVO toListVO(PostEntity entity);

  /**
   * 仅反映<strong>库表字段</strong>映射结果；{@code likedByCurrentUser} 恒为 {@code false}，详情接口请勿单独依赖本方法返回值，
   * 应使用 {@link com.anzhiyu.blogapi.service.impl.PostServiceImpl#getDetailById(Long, String)} 里合并后的 VO。
   */
  @Mapping(target = "likedByCurrentUser", constant = "false")
  @Mapping(target = "date", source = "date")
  PostDetailVO toDetailVO(PostEntity entity);

  /**
   * MapStruct 约定：存在「源类型 → 目标类型」转换需求时，可在接口中声明名为 {@code map} 的 default 方法（或配合
   * {@code @Named} 等），生成代码时会调用它来把 {@link LocalDateTime} 写成字符串。
   */
  default String map(LocalDateTime value) {
    return value == null ? null : value.toString();
  }
}
