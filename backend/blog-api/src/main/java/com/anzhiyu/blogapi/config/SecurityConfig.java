package com.anzhiyu.blogapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 安全配置类
 * 前端类比：相当于一个配置文件，导出了密码加密工具函数
 * 
 * 说明：
 * 1. @Configuration 表示这是一个配置类，Spring 启动时会加载它
 * 2. @Bean 表示这个方法返回的对象会被 Spring 管理，其他类可以通过 @Autowired 注入
 * 3. BCryptPasswordEncoder 是 Spring Security 提供的密码加密器，使用 BCrypt 算法
 * 
 * 为什么不启用完整的 Spring Security？
 * 因为我们的 API 是前后端分离架构，使用 JWT 进行认证，不需要 Spring Security 的默认登录页和 CSRF 保护
 * 我们只借用它的 PasswordEncoder 来进行密码哈希
 */
@Configuration
public class SecurityConfig {

    /**
     * 创建 PasswordEncoder Bean
     * 前端类比：类似于 export const passwordEncoder = new BCryptPasswordEncoder()
     * 
     * BCrypt 算法特点：
     * 1. 每次加密结果都不同（即使密码相同），因为有随机盐值
     * 2. 自动包含盐值在哈希结果中，无需单独存储盐
     * 3. 验证时，encoder 会从哈希值中提取盐，然后计算并比对
     * 4. 防彩虹表攻击，无法逆向解密
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}