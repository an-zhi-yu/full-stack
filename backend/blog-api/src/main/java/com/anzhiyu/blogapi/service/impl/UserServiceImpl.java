package com.anzhiyu.blogapi.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.anzhiyu.blogapi.dto.UserDTO;
import com.anzhiyu.blogapi.dto.UserRegisterDTO;
import com.anzhiyu.blogapi.dto.UserUpdateDTO;
import com.anzhiyu.blogapi.entity.UserEntity;
import com.anzhiyu.blogapi.mapper.UserMapper;
import com.anzhiyu.blogapi.service.UserService;
import com.anzhiyu.blogapi.common.util.BeanUtil;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private final UserMapper userMapper;

  /**
   * 构造器注入：Spring 自动把编译期生成的 {@code UserMapperImpl} 传进来
   * （等价于前端依赖注入一个「格式化函数」单例）。
   */
  public UserServiceImpl(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  // 模拟用户数据：内部用 UserEntity 存储（包含密码），对外只返回脱敏后的 UserDTO
  private static final Map<String, UserEntity> USER_DB = new HashMap<>();

  static {
    // 为了方便你测试登录，这里内置一些 demo 用户，密码都设为 123456；其余资料字段用于验证「全量 toDto」
    USER_DB.put("1", demoUser("1", "test1", "user1@example.com"));
    USER_DB.put("2", demoUser("2", "test2", "user2@example.com"));
    USER_DB.put("3", demoUser("3", "test3", "user3@example.com"));
    USER_DB.put("4", demoUser("4", "test4", "user4@example.com"));
    USER_DB.put("5", demoUser("5", "test5", "user5@example.com"));
  }

  private static UserEntity demoUser(String id, String username, String email) {
    return UserEntity.builder()
        .id(id)
        .username(username)
        .password("123456")
        .email(email)
        .phone("1380000" + id)
        .city("Demo City")
        .country("CN")
        .bio("内置演示账号 " + username)
        .build();
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
        .map(userMapper::toDto)
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
    UserEntity entity = UserEntity.builder().id(id).username(request.getUsername()).password(request.getPassword())
        .build();
    USER_DB.put(id, entity);
    return userMapper.toDto(entity);
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
    return userMapper.toDto(entity);
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
    return entity == null ? null : userMapper.toDto(entity);
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
    return entity == null ? null : userMapper.toDto(entity);
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
}
