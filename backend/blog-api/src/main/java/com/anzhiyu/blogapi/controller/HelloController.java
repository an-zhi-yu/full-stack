package com.anzhiyu.blogapi.controller;

import com.anzhiyu.blogapi.common.ApiResult;
import com.anzhiyu.blogapi.dto.HealthPayload;
import com.anzhiyu.blogapi.service.HelloService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST 示例：统一前缀 /api，返回 {@link ApiResult} JSON，便于前端统一解析。
 */
@RestController
@RequestMapping("/api")
public class HelloController {

    private final HelloService helloService;

    public HelloController(HelloService helloService) {
        this.helloService = helloService;
    }

    /** GET /api/hello */
    @GetMapping("/hello")
    public ApiResult<String> hello() {
        return ApiResult.ok(helloService.greeting());
    }

    /** GET /api/health — 负载均衡 / 探活常用 */
    @GetMapping("/health")
    public ApiResult<HealthPayload> health() {
        return ApiResult.ok(helloService.healthPayload());
    }
}
