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

/**
 * 简化版 JWT 认证过滤器（不引入 Spring Security）。
 *
 * 前端视角可以把它理解成「后端版 axios 拦截器」：
 *
 * <pre>
 * 路径规则总览（仅对 /api/** 生效）：
 *
 *  1）完全不需要 JWT：
 *     - POST /api/v1/user            注册
 *     - POST /api/v1/user/login      登录
 *     - /api/learn/**                学习 demo
 *     - /api/hello, /api/health      健康检查
 *
 *  2）文章公开但可带 JWT：
 *     - GET  /api/v1/posts           列表（匿名可访问）
 *     - GET  /api/v1/posts/{id}      详情（匿名可访问；若带 token，用于算 likedByCurrentUser）
 *     - POST /api/v1/posts/{id}/view 浏览上报（匿名）
 *     - POST /api/v1/posts           新建文章（教学 demo：不强制登录）
 *
 *  3）其余 /api/**：
 *     - 必须带合法 Bearer token，否则返回 HTTP 401 + { code: 401, message: ... }
 * </pre>
 */
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return !path.startsWith("/api/");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        // 1）完全公开的接口（连 token 都不看）
        if (isPublicUserPath(method, path) || isPublicLearnPath(path) || isPublicHealthPath(path)
                || isPublicPostPath(method, path)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2）文章详情：可选 JWT，用于 likedByCurrentUser
        if (isPostDetailPath(method, path)) {
            tryOptionalJwt(request);
            filterChain.doFilter(request, response);
            return;
        }

        // 3）其余 /api/**：必须 Bearer
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            writeUnauthorized(response, "缺少 Authorization: Bearer token");
            return;
        }

        String token = authHeader.substring("Bearer ".length()).trim();
        try {
            Claims claims = jwtUtil.parseToken(token);
            request.setAttribute("uid", claims.get("uid"));
            request.setAttribute("uname", claims.get("uname"));
            filterChain.doFilter(request, response);
        } catch (Exception ex) {
            writeUnauthorized(response, "token 无效或已过期");
        }
    }

    // ── 路径判断辅助方法（只封装 if 条件，让主流程更像「规则表」） ─────────────

    private static boolean isPublicUserPath(String method, String path) {
        // 登录：POST /api/v1/user/login
        if (path.startsWith("/api/v1/user/login")) {
            return true;
        }
        // 预留 /api/v1/user/register 写法
        if (path.startsWith("/api/v1/user/register")) {
            return true;
        }
        // 注册：POST /api/v1/user（UserController.createUser）
        return "POST".equalsIgnoreCase(method) && "/api/v1/user".equals(path);
    }

    private static boolean isPublicLearnPath(String path) {
        return path.startsWith("/api/learn");
    }

    private static boolean isPublicHealthPath(String path) {
        return path.startsWith("/api/hello") || path.startsWith("/api/health");
    }

    private static boolean isPublicPostPath(String method, String path) {
        // GET /api/v1/posts — 列表（完全公开）
        if ("GET".equalsIgnoreCase(method) && "/api/v1/posts".equals(path)) {
            return true;
        }
        // POST /api/v1/posts/{id}/view — 浏览上报（匿名）
        if ("POST".equalsIgnoreCase(method) && isPostViewPath(path)) {
            return true;
        }
        // POST /api/v1/posts — 新建（教学 demo：不强制登录）
        return "POST".equalsIgnoreCase(method) && "/api/v1/posts".equals(path);
    }

    private static boolean isPostDetailPath(String method, String path) {
        return "GET".equalsIgnoreCase(method) && isSinglePostDetailPath(path);
    }

    private static boolean isSinglePostDetailPath(String path) {
        if (!path.startsWith("/api/v1/posts/")) {
            return false;
        }
        String rest = path.substring("/api/v1/posts/".length());
        return !rest.isEmpty() && !rest.contains("/");
    }

    /** /api/v1/posts/{id}/view */
    private static boolean isPostViewPath(String path) {
        if (!path.endsWith("/view")) {
            return false;
        }
        String prefix = "/api/v1/posts/";
        if (!path.startsWith(prefix)) {
            return false;
        }
        String middle = path.substring(prefix.length(), path.length() - "/view".length());
        return !middle.isEmpty() && !middle.contains("/");
    }

    /**
     * 详情页带 token 时解析 uid；无效 token 不抛 401，当作未登录读文章。
     */
    private void tryOptionalJwt(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        try {
            String token = authHeader.substring("Bearer ".length()).trim();
            Claims claims = jwtUtil.parseToken(token);
            request.setAttribute("uid", claims.get("uid"));
            request.setAttribute("uname", claims.get("uname"));
        } catch (Exception ignored) {
            // 匿名浏览
        }
    }

    private void writeUnauthorized(HttpServletResponse response, String msg) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setContentType("application/json;charset=UTF-8");
        ApiResult<Void> body = ApiResult.fail(401, msg);
        response.getWriter().write(objectMapper.writeValueAsString(body));
    }}

    
    
        
        
        
        
    
    
    
        
    