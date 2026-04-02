package com.anzhiyu.blogapi.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anzhiyu.blogapi.common.ApiResult;
import com.anzhiyu.blogapi.common.util.JwtUtil;
import com.anzhiyu.blogapi.dto.UserDTO;
import com.anzhiyu.blogapi.dto.UserLoginDTO;
import com.anzhiyu.blogapi.dto.UserLoginResponseDTO;
import com.anzhiyu.blogapi.dto.UserRegisterDTO;
import com.anzhiyu.blogapi.dto.UserUpdateDTO;
import com.anzhiyu.blogapi.service.UserService;

import jakarta.validation.Valid;

/**
 * 用户相关 HTTP 接口（前端对照）。
 *
 * <p>类比：你在 Node 里写一个 <code>router</code>，挂在 <code>/api/v1/user</code> 下；
 * 这里用类上的 {@code @RequestMapping} 当「公共前缀」，方法上的 {@code @GetMapping} 等当子路径。</p>
 *
 * <p>{@code @Valid}：在请求体反序列化成 DTO <strong>之后</strong>，按 DTO 字段上的注解（如
 * {@code @NotBlank}）做校验；不通过会抛异常，由 {@code ApiExceptionHandler} 统一变成 HTTP 400，
 * 类似你在 Zod parse 失败时返回 400。</p>
 *
 * <p>注意：类上的 {@code @RestController} = 本类每个方法的返回值都序列化成 JSON 写到响应体
 *（除非返回类型是 {@link ResponseEntity}，那时还要同时控制状态码）。</p>
 */
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

  private final UserService userService;
  private final JwtUtil jwtUtil;

  /**
   * 构造器注入：不要自己 {@code new UserServiceImpl()}，Spring 会根据类型把已注册的 Bean 传进来。
   * 类比：依赖注入 ≈ 函数参数由框架传入单例。
   */
  public UserController(UserService userService, JwtUtil jwtUtil) {
    this.userService = userService;
    this.jwtUtil = jwtUtil;
  }

  /**
   * GET /api/v1/user —— 用户列表。
   * <p>需 JWT：由全局 {@code JwtAuthFilter} 处理，本方法只负责调 Service。</p>
   */
  @GetMapping
  public ApiResult<List<UserDTO>> getUsers() {
    return ApiResult.ok(this.userService.getAllUsers());
  }

  /**
   * GET /api/v1/user/{id} —— 单个用户详情。
   * <p>找不到用户时：HTTP 404 + body 里仍是 {@link ApiResult} 形状（与「文章详情」一致），
   * 前端可以用 <code>response.status === 404</code> 或 body.code 判断。</p>
   */
  @GetMapping("/{id}")
  public ResponseEntity<ApiResult<UserDTO>> getUserDetail(@PathVariable String id) {
    return userService.getById(id)
        .map(u -> ResponseEntity.ok(ApiResult.ok(u)))
        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(ApiResult.fail(404, "用户不存在: " + id)));
  }

  /**
   * POST /api/v1/user —— 注册（匿名可访问，Filter 白名单放行）。
   * <p>{@code @Valid}：校验 {@link UserRegisterDTO} 里的用户名、密码长度等。</p>
   * <p>用户名冲突：Service 抛 {@code ConflictException} → HTTP 409（由全局异常处理器转换）。</p>
   */
  @PostMapping
  public ApiResult<UserDTO> createUser(@Valid @RequestBody UserRegisterDTO request) {
    return ApiResult.ok(userService.register(request));
  }

  /**
   * PUT /api/v1/user/{id} —— 更新用户。
   * <p>前端：axios.put(\`/api/v1/user/${id}\`, body)。id 在 URL，JSON 在 body。</p>
   * <p>{@code @RequestBody} + record：JSON 字段会绑定到 DTO；{@code @Valid} 触发校验。</p>
   */
  @PutMapping("/{id}")
  public ApiResult<UserDTO> updateUser(
      @PathVariable String id,
      @Valid @RequestBody UserUpdateDTO request) {
    return ApiResult.ok(userService.update(id, request));
  }

  /**
   * DELETE /api/v1/user/{id} —— 删除用户（REST 习惯）。
   * <p>成功：HTTP 204，<strong>没有响应体</strong>（不要指望再 parse 一层 JSON）。</p>
   * <p>不存在：HTTP 404。</p>
   * <p>类比 Express：<code>res.status(204).send()</code> / <code>res.sendStatus(404)</code>。</p>
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable String id) {
    if (!userService.deleteById(id)) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.noContent().build();
  }

  /**
   * POST /api/v1/user/login —— 用户名密码换 token。
   * <p>故意让「账号密码错误」走 <strong>HTTP 200 + body.code = 400</strong>：
   * 这样不会和「没带 / 过期 token」时的 <strong>HTTP 401</strong>（Filter 返回）混在一类里，
   * 前端 axios 若对 401 统一清 token 跳登录页，也不会误伤登录表单。</p>
   * <p>成功时：body.data 里有 token + {@link UserDTO}（无密码字段）。</p>
   */
  @PostMapping("/login")
  public ApiResult<UserLoginResponseDTO> login(@Valid @RequestBody UserLoginDTO request) {
    return userService.login(request.username(), request.password())
        .map(user -> ApiResult.ok(
            new UserLoginResponseDTO(
                jwtUtil.generateToken(user.id(), user.username()),
                user)))
        .orElseGet(() -> ApiResult.fail(400, "用户名或密码错误"));
  }
}
