package com.anzhiyu.blogapi.dto;

/**
 * 把「YAML 读到的配置 + 当前端口」一并返回给前端，方便对照学习。
 */
public record ConfigDemoView(
        String siteName,
        String welcomeExtra,
        int serverPort
) {
}
