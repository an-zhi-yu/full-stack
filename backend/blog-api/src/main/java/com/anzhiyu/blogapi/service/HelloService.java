package com.anzhiyu.blogapi.service;

import com.anzhiyu.blogapi.dto.HealthPayload;

/**
 * Hello / 健康检查 —— 接口定义（与 {@link com.anzhiyu.blogapi.service.impl.HelloServiceImpl} 分离）。
 *
 * <p>为什么多此一举？和前端「先写 TypeScript 接口再写实现类」一样：Controller 只依赖接口，
 * 以后换实现、写单测 Mock 都更轻松；与 {@link UserService}、{@link PostService} 风格统一。</p>
 */
public interface HelloService {

  /** 给人看的欢迎语字符串 */
  String greeting();

  /**
   * 探活用的结构化数据（比随便 {@code Map} 更稳），实际项目里可加 version、gitCommit 等字段。
   */
  HealthPayload healthPayload();
}
