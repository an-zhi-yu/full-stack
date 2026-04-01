package com.anzhiyu.blogapi.config;

import com.anzhiyu.blogapi.common.ApiResult;
import com.anzhiyu.blogapi.common.util.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * 简化版 JWT 认证过滤器（不引入 Spring Security）。
 *
 * 前端视角理解：
 * - 等价于一个全局的 axios 拦截器，只不过跑在后端：
 *   - 白名单路径直接放行（登录、注册、学习用接口）
 *   - 其它 /api/** 必须带上 Authorization: Bearer <token>
 *   - token 解析失败 → HTTP 401 + { code: 401, message: 'token 无效或已过期' }
 */
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // 简单白名单（前缀匹配）
    private static final List<String> WHITELIST_PREFIXES = List.of(
            "/api/v1/user/login",
            "/api/v1/user/register",
            "/api/learn",
            "/health"
    );

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        // 只关心 /api/ 开头的接口，其它路径（静态资源等）直接放行
        if (!path.startsWith("/api/")) {
            return true;
        }
        // 白名单前缀放行
        return WHITELIST_PREFIXES.stream().anyMatch(path::startsWith);
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            writeUnauthorized(response, "缺少 Authorization: Bearer token");
            return;
        }

        String token = authHeader.substring("Bearer ".length()).trim();
        try {
            Claims claims = jwtUtil.parseToken(token);
            // 简单示例：把 uid / uname 放到 request attribute，后续需要可以在 Controller 里读取
            request.setAttribute("uid", claims.get("uid"));
            request.setAttribute("uname", claims.get("uname"));
            filterChain.doFilter(request, response);
        } catch (Exception ex) {
            writeUnauthorized(response, "token 无效或已过期");
        }
    }

    private void writeUnauthorized(HttpServletResponse response, String msg) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setContentType("application/json;charset=UTF-8");
        ApiResult<Void> body = ApiResult.fail(401, msg);
        response.getWriter().write(objectMapper.writeValueAsString(body));
    }
}

