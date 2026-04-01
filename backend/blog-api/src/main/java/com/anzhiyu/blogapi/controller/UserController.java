package com.anzhiyu.blogapi.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anzhiyu.blogapi.common.ApiResult;
import com.anzhiyu.blogapi.dto.UserDTO;
import com.anzhiyu.blogapi.dto.UserRegisterDTO;
import com.anzhiyu.blogapi.dto.UserUpdateDTO;
import com.anzhiyu.blogapi.service.UserService;

@RestController // 这个类里每个方法的返回值都序列化成 JSON 写到 HTTP 响应体（类似总是 res.json()）
@RequestMapping("/api/v1/user") // 整类共用的 URL 前缀；下面每个方法的路径都挂在这后面
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  /**
   * 获取所有用户
   * 
   * @return 所有用户信息
   */
  @GetMapping() // 等价于 @GetMapping("")：映射到「当前前缀」本身，即 /api/v1/users
  public ApiResult<List<UserDTO>> getUsers() {
    return ApiResult.ok(this.userService.getAllUsers());
  }

  /**
   * 创建用户
   * 
   * @param request 创建用户请求
   * @return 创建后的用户信息
   */
  @PostMapping()
  public ApiResult<UserDTO> createUser(@RequestBody UserRegisterDTO request) {
    return ApiResult.ok(userService.register(request));
  }

  /**
   * 更新用户
   * 
   * @param id      用户ID
   * @param request 更新用户请求
   * @return 更新后的用户信息
   */
  @PutMapping("/{id}")
  public ApiResult<UserDTO> updateUser(@PathVariable String id, @RequestBody UserUpdateDTO request) {
    return ApiResult.ok(userService.update(id, request));
  }

  /**
   * 删除用户
   * 
   * @param id 用户ID
   * @return 删除后的用户信息
   */
  @DeleteMapping("/{id}")
  public ApiResult<String> deleteUser(@PathVariable String id) {
    userService.logout(id);
    return ApiResult.ok("注销成功");
  }
}
