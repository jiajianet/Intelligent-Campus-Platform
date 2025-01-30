package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.Classroom;
import com.xiyanchenghong.backenduser.domain.ClassroomStudent;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.service.ClassroomService;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private ClassroomService classroomService;

    @Autowired
    private UserService userService;

    @GetMapping("/getClassroomInfo")
    public Result<Classroom> getClassroomInfo(@RequestHeader("Authorization") String token) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token)) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.STUDENT) {
                return Result.error(403, "Unauthorized");
            }

            // 获取教室信息
            Classroom classroom = classroomService.getClassroomInfo(userId);
            if (classroom != null) {
                return Result.success(classroom);
            } else {
                return Result.error(404, "Classroom not found");
            }

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/joinClassroom")
    public Result<String> joinClassroom(@RequestHeader("Authorization") String token, @RequestBody ClassroomStudent classroomStudent) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token)) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.STUDENT) {
                return Result.error(403, "Unauthorized");
            }

            // 设置学生ID
            classroomStudent.setStudentId(userId);

            // 加入教室
            ClassroomStudent newClassroomStudent = classroomService.joinClassroom(classroomStudent);

            if (newClassroomStudent != null) {
                return Result.success("Joined classroom successfully!");
            } else {
                return Result.error(500, "Failed to join classroom");
            }

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }
}