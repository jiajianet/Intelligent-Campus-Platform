package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.Assignment;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.service.AssignmentService;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher")
public class TeacherAssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;

    @PostMapping("/addAssignment")
    public Result<String> addAssignment(@RequestHeader("Authorization") String token, @RequestBody Assignment assignment) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return Result.error(403, "Unauthorized");
            }

            // 设置教师 ID
            assignment.setTeacherId(userId);

            // 添加作业
            assignmentService.addAssignment(assignment);

            return Result.success("Assignment added successfully!");

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @DeleteMapping("/deleteAssignment/{assignmentId}")
    public Result<String> deleteAssignment(@RequestHeader("Authorization") String token, @PathVariable Long assignmentId) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return Result.error(403, "Unauthorized");
            }

            // 删除作业
            assignmentService.deleteAssignment(assignmentId, userId);

            return Result.success("Assignment deleted successfully!");

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @PutMapping("/modifyAssignment")
    public Result<String> modifyAssignment(@RequestHeader("Authorization") String token, @RequestBody Assignment assignment) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return Result.error(403, "Unauthorized");
            }

            // 设置教师 ID
            assignment.setTeacherId(userId);

            // 修改作业
            assignmentService.modifyAssignment(assignment);

            return Result.success("Assignment modified successfully!");

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }
}