package com.anzhiyu.blogapi.controller;

import com.anzhiyu.blogapi.common.ApiResult;
import com.anzhiyu.blogapi.config.AppDemoProperties;
import com.anzhiyu.blogapi.dto.ConfigDemoView;
import com.anzhiyu.blogapi.dto.EchoBody;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 给「前端转后端」看的注释型示例：最简 GET、JSON POST、读 YAML。
 * 正式项目里可删或迁到文档。
 */
@RestController // ① 声明：这个类里所有接口的返回值都直接作为 HTTP 响应体（一般是 JSON），相当于 Express 里统一 res.json()
@RequestMapping("/api/learn") // ② 类级别前缀：下面每个方法的 URL 都会带上 /api/learn
public class FrontendLearningController {

    private final AppDemoProperties demoProps; // ③ 构造器注入：Spring 把 YAML 绑定好的配置对象塞进来（单例）

    @Value("${server.port:8080}") // ④ 再演示一种读法：按「点路径」取单个配置；冒号后是默认值（YAML 没写 port 时用）
    private int serverPort;

    public FrontendLearningController(AppDemoProperties demoProps) {
        this.demoProps = demoProps;
    }

    // ═══════════════════════════════════════════════════════════════════
    // 一、最简 GET（无请求体、无路径参数）
    // ═══════════════════════════════════════════════════════════════════

    /**
     * ⑤ 浏览器地址栏 / Postman：GET http://localhost:8080/api/learn/ping
     * ⑥ 返回纯字符串也行，但本项目统一包一层 ApiResult，前端好写拦截器。
     */
    @GetMapping("/ping") // ⑦ 只接受 HTTP GET；完整路径 = 类前缀 + "/ping"
    public ApiResult<String> ping() { // ⑧ 方法名随意，不参与 URL
        // ⑨ 没有 @RequestParam / @PathVariable，所以浏览器不用带 ?query
        return ApiResult.ok("pong"); // ⑩ 最终 JSON 形如 {"code":0,"message":"ok","data":"pong"}
    }

    // ═══════════════════════════════════════════════════════════════════
    // 二、读 application*.yml 里的自定义配置 + 当前端口
    // ═══════════════════════════════════════════════════════════════════

    /**
     * GET http://localhost:8080/api/learn/config-yml-demo
     * 改 application.yml / application-dev.yml 里的 app.demo，重启后此处会变。
     */
    @GetMapping("/config-yml-demo")
    public ApiResult<ConfigDemoView> configYmlDemo() {
        var view = new ConfigDemoView(
                demoProps.siteName(),
                demoProps.welcomeExtra(),
                serverPort);
        return ApiResult.ok(view);
    }

    // ═══════════════════════════════════════════════════════════════════
    // 三、POST + JSON 请求体，原样 echo（练习 Content-Type 与跨域）
    // ═══════════════════════════════════════════════════════════════════

    /**
     * POST http://localhost:8080/api/learn/echo
     * Header: Content-Type: application/json
     * Body 示例：{"name":"张三","note":"hello"}
     * <p>
     * ⑪ @RequestBody：把请求体 JSON 反序列化成 Java record（缺字段则为 null）
     */
    @PostMapping("/echo") // ⑫ 只接受 POST；GET 过来会 405
    public ApiResult<EchoBody> echo(@RequestBody EchoBody body) { // ⑬ 必须用 POST + JSON，否则 415 Unsupported Media Type
        return ApiResult.ok("echo", body); // ⑭ 把收到的对象再包进 data 返回，方便你对照请求/响应
    }
}
