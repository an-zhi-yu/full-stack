package com.anzhiyu.blogapi.service;

import java.util.List;
import java.util.Optional;

import com.anzhiyu.blogapi.dto.UserDTO;
import com.anzhiyu.blogapi.dto.UserRegisterDTO;
import com.anzhiyu.blogapi.dto.UserUpdateDTO;

/**
 * 用户业务契约（接口）。
 *
 * <p>前端类比：你在 TS 里先写一个 <code>interface UserService</code>，再有一个具体实现类；
 * Spring 在 Controller 里注入的是<strong>接口类型</strong>，运行时用唯一的实现类
 * {@link com.anzhiyu.blogapi.service.impl.UserServiceImpl}，方便以后换实现或做单元测试 Mock。</p>
 */
public interface UserService {

  List<UserDTO> getAllUsers();

  UserDTO register(UserRegisterDTO request);

  /**
   * 校验用户名 + 密码（库内是 BCrypt 哈希对比）。
   *
   * <p>成功：{@code Optional} 里有脱敏后的 {@link UserDTO}；失败：{@code Optional.empty()}。
   * Controller 再决定返回「200 + code≠0」还是别的方式，避免和鉴权 401 语义打架。</p>
   */
  Optional<UserDTO> login(String username, String password);

  UserDTO update(String id, UserUpdateDTO request);

  Optional<UserDTO> getById(String id);

  /**
   * 按 id 删除；存在并删除成功返回 true，本来就没有这个 id 返回 false。
   * <p>Controller 再把 false 映射成 HTTP 404，true 映射成 204。</p>
   */
  boolean deleteById(String id);
}
