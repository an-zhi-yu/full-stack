package com.anzhiyu.blogapi.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.anzhiyu.blogapi.dto.UserDTO;
import com.anzhiyu.blogapi.dto.UserRegisterDTO;
import com.anzhiyu.blogapi.dto.UserUpdateDTO;
import com.anzhiyu.blogapi.service.UserService;
import com.anzhiyu.blogapi.common.util.BeanUtil;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  // 模拟用户数据 static 是属于类本身的，而不是属于对象的 他每次new 都会有新的对象 所以用static，不会重置MOCK_USER
  private final static Map<String, UserDTO> USER_DB = new HashMap<>();

  static {
    USER_DB.put("1", UserDTO.builder().id("1").username("test").build());
    USER_DB.put("2", UserDTO.builder().id("2").username("test2").build());
    USER_DB.put("3", UserDTO.builder().id("3").username("test3").build());
    USER_DB.put("4", UserDTO.builder().id("4").username("test4").build());
    USER_DB.put("5", UserDTO.builder().id("5").username("test5").build());
    USER_DB.put("6", UserDTO.builder().id("6").username("test6").build());
    USER_DB.put("7", UserDTO.builder().id("7").username("test7").build());
    USER_DB.put("8", UserDTO.builder().id("8").username("test8").build());
  }

  /**
   * 获取所有用户
   * 
   * @return 所有用户信息
   */
  @Override
  public List<UserDTO> getAllUsers() {
    // return new ArrayList<UserDTO>(USER_DB.values()); // 1 可变List 可以add/remove
    // return new ArrayList<>(USER_DB.values()); //2 可变List 可以add/remove
    return List.copyOf(USER_DB.values()); // 3 不可变List 不能add/remove
    // return USER_DB.values().stream().toList(); //4 不可变List 不能add/remove
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
    UserDTO user = UserDTO.builder().id(id).username(request.getUsername()).build();
    USER_DB.put(id, user);
    return user;
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
    UserDTO oldUser = getById(id);
    if (oldUser == null) {
      throw new RuntimeException("User not found");
    }
    BeanUtil.copyNonNullProperties(request, oldUser);
    return oldUser;
  }

  /**
   * 根据ID获取用户
   * 
   * @param id 用户ID
   * @return 用户信息
   */
  @Override
  public UserDTO getById(String id) {
    return USER_DB.get(id);
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
    return USER_DB.get(username);
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
