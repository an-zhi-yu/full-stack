package com.anzhiyu.blogapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.anzhiyu.blogapi.dto.UserDTO;
import com.anzhiyu.blogapi.entity.UserEntity;

/**
 * Entity → 对外 DTO 的映射（编译期生成实现类，类似 TS 里写一个纯函数 + 类型推导）。
 *
 * <p>前端类比：像在 Node 里写 {@code const toUserDTO = (row) => ({ ...row, password: undefined })}
 * 然后删掉 password 再返回；这里由 MapStruct 按「同名属性」拷贝，{@code UserDTO} 里没有 password
 * 字段，因此密码永远不会出现在 JSON 响应里。</p>
 *
 * <p>{@code componentModel = "spring"}：生成带 {@code @Component} 的实现类，可被
 * {@code @Autowired} / 构造器注入，和别的 Service 一样交给 IoC 管理。</p>
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

  /**
   * 单条转换：内部 {@link UserEntity} → 接口返回 {@link UserDTO}（无 password）。
   */
  UserDTO toDto(UserEntity entity);
}
