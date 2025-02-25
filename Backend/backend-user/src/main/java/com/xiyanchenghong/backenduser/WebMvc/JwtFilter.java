package com.xiyanchenghong.backenduser.WebMvc;

import com.xiyanchenghong.backenduser.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.FilterChain;
import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws jakarta.servlet.ServletException, IOException {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            try {
                Claims claims = JwtUtils.parseJwt(token);
                if (JwtUtils.isTokenExpired(token)) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expired");
                    return;
                }
                Long userId = JwtUtils.getUserIdFromToken(token);
                if (userId == null) {
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "User ID is null");
                    return;
                }
                request.setAttribute("claims", claims);
                request.setAttribute("userId", userId);
            } catch (Exception e) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
