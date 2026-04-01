package com.anzhiyu.blogapi.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.anzhiyu.blogapi.dto.UserDTO;
import com.anzhiyu.blogapi.dto.UserRegisterDTO;
import com.anzhiyu.blogapi.dto.UserUpdateDTO;
import com.anzhiyu.blogapi.entity.UserEntity;
import com.anzhiyu.blogapi.service.UserService;
import com.anzhiyu.blogapi.common.util.BeanUtil;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  // 模拟用户数据：内部用 UserEntity 存储（包含密码），对外只返回脱敏后的 UserDTO
  private final static Map<String, UserEntity> USER_DB = new HashMap<>();

  static {
    // 为了方便你测试登录，这里内置一些 demo 用户，密码都设为 123456
    USER_DB.put("1", new UserEntity("1", "test1", "123456"));
    USER_DB.put("2", new UserEntity("2", "test2", "123456"));
    USER_DB.put("3", new UserEntity("3", "test3", "123456"));
    USER_DB.put("4", new UserEntity("4", "test4", "123456"));
    USER_DB.put("5", new UserEntity("5", "test5", "123456"));
  }

  /**
   * 获取所有用户
   * 
   * @return 所有用户信息
   */
  @Override
  public List<UserDTO> getAllUsers() {
    // 对外只返回不含密码的 UserDTO 列表
    return USER_DB.values().stream()
        .map(this::toDto)
        .toList();
  }

  /**
   * 注册用户
   * 
   * @param request 注册用户请求
   * @return 注册后的用户信息
   */
  @Override
  public UserDTO register(UserRegisterDTO request) {
    String id = "user-" + UUID.randomUUID().toString().replace("-", "").substring(0, 12);
    UserEntity entity = new UserEntity(id, request.getUsername(), request.getPassword());
    USER_DB.put(id, entity);
    return toDto(entity);
  }

  /**
   * 更新用户
   * 
   * @param id      用户ID
   * @param request 更新用户请求
   * @return 更新后的用户信息
   */
  @Override
  public UserDTO update(String id, UserUpdateDTO request) {
    UserEntity entity = USER_DB.get(id);
    if (entity == null) {
      throw new RuntimeException("User not found");
    }
    // 这里用 BeanUtil 把 request 里的非空字段拷贝到 entity 上（字段名需对齐）
    BeanUtil.copyNonNullProperties(request, entity);
    return toDto(entity);
  }

  /**
   * 根据ID获取用户
   * 
   * @param id 用户ID
   * @return 用户信息
   */
  @Override
  public UserDTO getById(String id) {
    UserEntity entity = USER_DB.get(id);
    return entity == null ? null : toDto(entity);
  }

  /**
   * 登录
   * 
   * @param username 用户名
   * @param password 密码
   * @return 登录后的用户信息
   */
  @Override
  public UserDTO login(String username, String password) {
    UserEntity entity = USER_DB.values().stream()
        .filter(user -> user.getUsername().equals(username) && user.getPassword().equals(password))
        .findFirst()
        .orElse(null);
    return entity == null ? null : toDto(entity);
  }

  /**
   * 退出登录
   * 
   * @param id 用户ID
   * @return 退出登录结果
   */
  @Override
  public String logout(String id) {
    USER_DB.remove(id);
    return "ok";
  }

  /**
   * 内部实体 -> 对外 DTO（去掉 password）
   */
  private UserDTO toDto(UserEntity entity) {
    return new UserDTO(entity.getId(), entity.getUsername());
  }
}
