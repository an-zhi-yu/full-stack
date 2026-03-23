package com.anzhiyu.blogapi.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 绑定 YAML 里 app.demo 段（自定义配置）。
 * <p>
 * 前端类比：像读取 vite.config 里自定义的 define / env 前缀，只不过在服务端由 Spring 注入。
 * <p>
 * 启用方式：启动类上 {@code @ConfigurationPropertiesScan}，本 record 带 {@code @ConfigurationProperties} 即可被注册为 Bean。
 */
@ConfigurationProperties(prefix = "app.demo")
public record AppDemoProperties(
        /** 对应 app.demo.site-name */
        String siteName,
        /** 对应 app.demo.welcome-extra */
        String welcomeExtra
) {
}
