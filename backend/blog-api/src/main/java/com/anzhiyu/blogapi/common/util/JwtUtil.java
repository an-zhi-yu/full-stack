package com.anzhiyu.blogapi.common.util;

import com.anzhiyu.blogapi.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;

public class JwtUtil {
  private final Key key;
  private final long expireMillis;

  /**
   * 构造器
   * 
   * @param props JWT 配置
   */
  public JwtUtil(JwtProperties props) {
    this.key = new SecretKeySpec(
        props.secret().getBytes(StandardCharsets.UTF_8),
        SignatureAlgorithm.HS256.getJcaName());
    this.expireMillis = props.expireMinutes() * 60_000L;
  }

  /** 生成包含基础信息的 Token */
  public String generateToken(String userId, String username) {
    long now = System.currentTimeMillis();
    Date issuedAt = new Date(now);
    Date expireAt = new Date(now + expireMillis);
    return Jwts.builder()
        .setSubject(userId)
        .setClaims(Map.of("uid", userId, "uname", username))
        .setIssuedAt(issuedAt)
        .setExpiration(expireAt)
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  /** 解析并校验 Token，失败抛异常 */
  public Claims parseToken(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token)
        .getBody();
  }
}
