package com.anzhiyu.blogapi.service.impl;

import com.anzhiyu.blogapi.dto.HealthPayload;
import com.anzhiyu.blogapi.service.HelloService;
import org.springframework.stereotype.Service;

/**
 * {@link HelloService} 的默认实现。
 *
 * <p>{@code @Service}：告诉 Spring「这是一个受管组件（Bean）」，和 {@code @Component} 类似，
 * 只是语义上强调「这一层做业务」；容器启动时会 new 一个单例，注入到 {@link com.anzhiyu.blogapi.controller.HelloController}。</p>
 */
@Service
public class HelloServiceImpl implements HelloService {

  @Override
  public String greeting() {
    return "Hello, Spring Boot 3 + Java 17!";
  }

  @Override
  public HealthPayload healthPayload() {
    return new HealthPayload("UP");
  }
}
