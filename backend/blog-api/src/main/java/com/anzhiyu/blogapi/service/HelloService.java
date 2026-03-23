package com.anzhiyu.blogapi.service;

import com.anzhiyu.blogapi.dto.HealthPayload;
import org.springframework.stereotype.Service;

/**
 * 欢迎语与健康检查等业务逻辑（示例很薄，仅演示 Controller 不堆业务）。
 */
@Service
public class HelloService {

    public String greeting() {
        return "Hello, Spring Boot 3 + Java 17!";
    }

    /**
     * 健康检查载荷：返回<strong>定义好的类型</strong>，而不是 Map。
     * 以后要加字段（如 version、db）只需改 {@link HealthPayload} 一处。
     */
    public HealthPayload healthPayload() {
        return new HealthPayload("UP");
    }
}
