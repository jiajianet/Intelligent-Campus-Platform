package com.xiyanchenghong.backenduser.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Map;

public class JwtUtils {
    private static final String SECRET_KEY = "Intelligent-Campus-Platform";
    //过期时间，加1000毫秒乘60乘3后过过期
    private static final Long EXPIRE = 1000L * 60 * 3;
//    private static final Long EXPIRE = 1000L * 5;
    /*
     * 生成jwt令牌
     *
     * @param claims JWT第二部分负载 poyload 中存储的内容
     * @return
     * */
    public static String generateJwt(Map<String, Object> claims) {
        String jwt = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)//签名算法和密钥,可以设置成常数
                .addClaims(claims)//设置已经给定的数据
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE))//令牌有效期
                .compact();//生成令牌
        return jwt;
    }
    /*
    * 解析JWT令牌
    *
    * @param jwt
    * @return jwt第二部分的负载poyload 中的存储的内容
    * */
    public static Claims parseJwt(String jwt) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(jwt)
                .getBody();
        return claims;
    }

}
