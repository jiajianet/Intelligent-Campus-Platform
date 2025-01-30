package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.SignIn;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.service.SignInService;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher")
public class TeacherSignInController {

    @Autowired
    private SignInService signInService;

    @Autowired
    private UserService userService;

    @PostMapping("/beginSignIn")
    public Result<String> beginSignIn(@RequestHeader("Authorization") String token, @RequestBody SignIn signIn) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token)) {
                return Result.error(403, "Token expired");
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return Result.error(403, "Unauthorized");
            }

            // 设置教师 ID
            signIn.setTeacherId(userId);

            // 开始签到
            signInService.beginSignIn(signIn);

            return Result.success("Sign-in started successfully!");

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/endSignIn")
    public Result<String> endSignIn(@RequestHeader("Authorization") String token, @RequestBody SignIn signIn) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token)) {
                return Result.error(403, "Token expired");
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return Result.error(403, "Unauthorized");
            }

            // 设置教师 ID
            signIn.setTeacherId(userId);

            // 结束签到
            signInService.endSignIn(signIn);

            return Result.success("Sign-in ended successfully!");

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }
}