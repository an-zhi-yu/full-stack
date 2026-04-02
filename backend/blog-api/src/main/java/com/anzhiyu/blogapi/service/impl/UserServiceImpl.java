package com.anzhiyu.blogapi.service.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.anzhiyu.blogapi.common.exception.ConflictException;
import com.anzhiyu.blogapi.common.exception.ResourceNotFoundException;
import com.anzhiyu.blogapi.dto.UserDTO;
import com.anzhiyu.blogapi.dto.UserRegisterDTO;
import com.anzhiyu.blogapi.dto.UserUpdateDTO;
import com.anzhiyu.blogapi.entity.UserEntity;
import com.anzhiyu.blogapi.mapper.UserMapper;
import com.anzhiyu.blogapi.service.UserService;

import jakarta.annotation.PostConstruct;

/**
 * {@link UserService} 的内存实现（教学用）。
 *
 * <p>前端理解三层分工：</p>
 * <ul>
 *   <li><strong>Controller</strong>：HTTP 进出的门脸（路径、状态码）。</li>
 *   <li><strong>Service（本类）</strong>：业务规则（重名？密码怎么存？谁来映射 DTO）。</li>
 *   <li><strong>内存 Map</strong>：假装是数据库表；生产应换成 JPA/JDBC，但这一层「怎么查怎么改」仍放在
 *       Repository 更合适，本 demo 简化为直接操作 Map。</li>
 * </ul>
 */
@Service
public class UserServiceImpl implements UserService {

  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;

  /**
   * 构造器注入两个 Bean：
   * <ul>
   *   <li>{@code UserMapper}：Entity → {@link UserDTO}（编译期 MapStruct 生成实现，像固定格式的
   *       <code>toJSON</code>）。</li>
   *   <li>{@code PasswordEncoder}：BCrypt 哈希，类比 npm 的 <code>bcrypt</code>。</li>
   * </ul>
   */
  public UserServiceImpl(UserMapper userMapper, PasswordEncoder passwordEncoder) {
    this.userMapper = userMapper;
    this.passwordEncoder = passwordEncoder;
  }

  /**
   * 模拟「用户表」主键 → 一行数据。
   * <p>用 {@link ConcurrentHashMap} 而不是普通 {@code HashMap}：多线程下 Put/Get 更安全
   *（类似你在 Node 里如果以后上集群，也不会误以为单线程）。教学单机也够安静。</p>
   */
  private static final Map<String, UserEntity> USER_DB = new ConcurrentHashMap<>();

  /**
   * 静态块：类第一次加载时执行一次，先塞进几个可登录的演示账号。
   * <p>此时还不能用 {@link #passwordEncoder}（字段尚未注入），所以密码先写成明文，
   * 会在下面的 {@link #initDemoUserPasswords()} 里统一改成 BCrypt。</p>
   */
  static {
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
   * Bean 创建完成、依赖注入完成之后执行：把演示账号的明文密码全部 encode 成 BCrypt。
   * <p>前端类比：组件 <code>mounted</code> / {@code useEffect(..., [])} 里做一次初始化。</p>
   */
  @PostConstruct
  private void initDemoUserPasswords() {
    for (UserEntity user : USER_DB.values()) {
      user.setPassword(passwordEncoder.encode(user.getPassword()));
    }
  }

  @Override
  public List<UserDTO> getAllUsers() {
    // Stream：像 array.map；toDto 去掉密码，只给前端看脱敏字段
    return USER_DB.values().stream()
        .map(userMapper::toDto)
        .toList();
  }

  @Override
  public UserDTO register(UserRegisterDTO request) {
    // record 的访问器是 username()，不是 getUsername()
    boolean exists = USER_DB.values().stream()
        .anyMatch(u -> u.getUsername().equals(request.username()));
    if (exists) {
      throw new ConflictException("用户名已存在: " + request.username());
    }
    String id = "user-" + UUID.randomUUID().toString().replace("-", "").substring(0, 12);
    String encodedPassword = passwordEncoder.encode(request.password());
    UserEntity entity = UserEntity.builder()
        .id(id)
        .username(request.username())
        .password(encodedPassword)
        .build();
    USER_DB.put(id, entity);
    return userMapper.toDto(entity);
  }

  /**
   * 部分更新（PATCH 语义常被实现成 PUT + 只传要改的字段）。
   * <p>{@link UserUpdateDTO} 是 <strong>record</strong>，没有 JavaBean 风格的 getter/setter，
   * 所以不用 {@code BeanUtils.copyProperties}，而是手写「字段非 null 才覆盖」——和你在 TS 里
   * {@code { ...old, ...patch }} omit undefined 一个意思。</p>
   */
  @Override
  public UserDTO update(String id, UserUpdateDTO request) {
    UserEntity entity = USER_DB.get(id);
    if (entity == null) {
      throw new ResourceNotFoundException("用户不存在: " + id);
    }
    if (request.username() != null) {
      entity.setUsername(request.username());
    }
    if (request.password() != null && !request.password().isBlank()) {
      entity.setPassword(passwordEncoder.encode(request.password()));
    }
    if (request.email() != null) {
      entity.setEmail(request.email());
    }
    if (request.phone() != null) {
      entity.setPhone(request.phone());
    }
    if (request.address() != null) {
      entity.setAddress(request.address());
    }
    if (request.city() != null) {
      entity.setCity(request.city());
    }
    if (request.state() != null) {
      entity.setState(request.state());
    }
    if (request.zip() != null) {
      entity.setZip(request.zip());
    }
    if (request.country() != null) {
      entity.setCountry(request.country());
    }
    if (request.website() != null) {
      entity.setWebsite(request.website());
    }
    if (request.bio() != null) {
      entity.setBio(request.bio());
    }
    return userMapper.toDto(entity);
  }

  /**
   * {@link Optional}：要么有一个用户，要么没有——比到处 return null 更不容易 NPE。
   * 类比 TS 的 {@code T | undefined} 再配合可选链。
   */
  @Override
  public Optional<UserDTO> getById(String id) {
    UserEntity entity = USER_DB.get(id);
    return entity == null ? Optional.empty() : Optional.of(userMapper.toDto(entity));
  }

  /**
   * 登录：先按用户名找到 {@link UserEntity}，再用 {@code passwordEncoder.matches(明文, 库中哈希)}。
   * <p>链式：filter + findFirst + filter 密码 + map 成 DTO；失败则得到 empty Optional。</p>
   */
  @Override
  public Optional<UserDTO> login(String username, String password) {
    return USER_DB.values().stream()
        .filter(user -> user.getUsername().equals(username))
        .findFirst()
        .filter(user -> passwordEncoder.matches(password, user.getPassword()))
        .map(userMapper::toDto);
  }

  /**
   * {@code remove} 返回被删掉的 value；没有该 key 返回 null → 用 {@code != null} 判断是否删成功。
   */
  @Override
  public boolean deleteById(String id) {
    return USER_DB.remove(id) != null;
  }
}
