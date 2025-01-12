package com.xiyanchenghong.backenduser.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.TimeUnit;
@Component
public class JwtUtils {
    private static final String SECRET_KEY = "s3cr3tK3y1234567890abcdefgHIJKLmnopqrsTUVWXyz"; // 替换为你的密钥
    private static final long EXPIRATION_TIME = 2 * 60 * 60 * 1000; // 2小时

    @Autowired
    private static StringRedisTemplate stringRedisTemplate;

    public static String generateJwt(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public static Claims parseJwt(String token) {
        if (isTokenInvalid(token)) {
            throw new RuntimeException("Token is invalid");
        }
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    public static boolean isTokenExpired(String token) {
        Claims claims = parseJwt(token);
        return claims.getExpiration().before(new Date());
    }

    public static void invalidateToken(String token) {
        // 将 token 加入黑名单
        stringRedisTemplate.opsForValue().set(token, "invalid", EXPIRATION_TIME, TimeUnit.MILLISECONDS);
    }

    public static boolean isTokenInvalid(String token) {
        // 检查 token 是否在黑名单中
        return Boolean.TRUE.equals(stringRedisTemplate.hasKey(token));
    }
    @Autowired
    public void setStringRedisTemplate(StringRedisTemplate stringRedisTemplate) {
        JwtUtils.stringRedisTemplate = stringRedisTemplate;
    }
}

