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
@RequestMapping("/student")
public class StudentSignInController {

    @Autowired
    private SignInService signInService;

    @Autowired
    private UserService userService;

    @PostMapping("/signIn")
    public Result<String> signIn(@RequestHeader("Authorization") String token, @RequestBody SignIn signIn) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.STUDENT) {
                return Result.error(403, "Unauthorized");
            }

            // 设置学生 ID
            signIn.setStudentId(userId);

            // 学生签到
            signInService.studentSignIn(signIn);

            return Result.success("Signed in successfully!");

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }
}