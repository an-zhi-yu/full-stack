package com.anzhiyu.blogapi.config;

import com.anzhiyu.blogapi.common.util.JwtUtil;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

  /** 从配置创建 JwtUtil，统一管理 secret 与过期时间 */
  @Bean
  public JwtUtil jwtUtil(JwtProperties props) {
    return new JwtUtil(props);
  }

  /**
   * 注册 JWT 过滤器：
   * - 仅拦截 /api/* 路径
   * - 登录、注册等白名单在 JwtAuthFilter 内部维护
   */
  @Bean
  public FilterRegistrationBean<JwtAuthFilter> jwtAuthFilterRegistration(JwtUtil jwtUtil) {
    FilterRegistrationBean<JwtAuthFilter> bean = new FilterRegistrationBean<>();
    bean.setFilter(new JwtAuthFilter(jwtUtil));
    bean.addUrlPatterns("/api/*");
    bean.setOrder(1);
    return bean;
  }
}
