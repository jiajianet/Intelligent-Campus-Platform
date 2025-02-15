package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.Classroom;
import com.xiyanchenghong.backenduser.domain.ClassroomStudent;
import com.xiyanchenghong.backenduser.utils.Result;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.service.ClassroomService;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classroom")
public class ClassroomController {

    @Autowired
    private ClassroomService classroomService;

    @Autowired
    private UserService userService;

    @GetMapping("/getClassroomInfo")
    public Result<Classroom> getClassroomInfo(@RequestHeader("Authorization") String token) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
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

    @PostMapping("/beginClassroom")
    public Result<Classroom> beginClassroom(@RequestHeader("Authorization") String token, @RequestBody Classroom classroom) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return Result.error(403, "Unauthorized");
            }

            // 设置教师ID
            classroom.setTeacherId(userId.intValue());

            // 开始教室
            Classroom newClassroom = classroomService.beginClassroom(classroom);

            return Result.success(newClassroom, "Classroom started successfully!");

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/endClassroom")
    public Result<String> endClassroom(@RequestHeader("Authorization") String token, @RequestBody Classroom classroom) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return Result.error(403, "Unauthorized");
            }

            // 设置教师ID
            classroom.setTeacherId(userId.intValue());

            // 结束教室
            Classroom updatedClassroom = classroomService.endClassroom(classroom);

            if (updatedClassroom != null) {
                return Result.success("Classroom ended successfully!");
            } else {
                return Result.error(404, "Classroom not found");
            }

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/modifyClassroom")
    public Result<Classroom> modifyClassroom(@RequestHeader("Authorization") String token, @RequestBody Classroom classroom) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return Result.error(403, "Unauthorized");
            }

            // 设置教师ID
            classroom.setTeacherId(userId.intValue());

            // 修改教室信息
            Classroom updatedClassroom = classroomService.modifyClassroom(classroom);

            if (updatedClassroom != null) {
                return Result.success(updatedClassroom, "Classroom modified successfully!");
            } else {
                return Result.error(404, "Classroom not found");
            }

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @GetMapping("/getStudents")
    public Result<List<ClassroomStudent>> getStudents(@RequestHeader("Authorization") String token, @RequestParam Long classroomId) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return Result.error(403, "Unauthorized");
            }

            // 获取教室中的学生
            List<ClassroomStudent> students = classroomService.getStudents(classroomId);
            return Result.success(students);

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }
}