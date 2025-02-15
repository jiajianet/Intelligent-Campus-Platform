package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.Exam;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.service.ExamService;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher")
public class TeacherExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private UserService userService;

    @PostMapping("/addExam")
    public ResponseEntity<Result<Exam>> addExam(@RequestHeader("Authorization") String token, @RequestBody Exam exam) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Token expired"));
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Unauthorized"));
            }

            // 设置教师 ID
            exam.setTeacherId(userId);

            // 添加考试
            examService.addExam(exam);

            return ResponseEntity.ok(Result.success(exam, "Exam added successfully!"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Invalid token"));
        }
    }

    @DeleteMapping("/deleteExam/{examId}")
    public ResponseEntity<Result<String>> deleteExam(@RequestHeader("Authorization") String token, @PathVariable Long examId) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Token expired"));
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Unauthorized"));
            }

            // 删除考试
            boolean isDeleted = examService.deleteExam(examId, userId);
            if (!isDeleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(404, "Exam not found or not authorized to delete"));
            }

            return ResponseEntity.ok(Result.success("Exam deleted successfully!"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(500, "An error occurred"));
        }
    }

    @PutMapping("/modifyExam/{examId}")
    public ResponseEntity<Result<Exam>> modifyExam(@RequestHeader("Authorization") String token, @PathVariable Long examId, @RequestBody Exam examDetails) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Token expired"));
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.TEACHER) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Unauthorized"));
            }

            // 查找并验证考试
            Exam existingExam = examService.getExamByIdAndTeacherId(examId, userId);
            if (existingExam == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(404, "Exam not found or not authorized to modify"));
            }

            // 修改考试信息
            existingExam.setTitle(examDetails.getTitle());
            existingExam.setDescription(examDetails.getDescription());
            existingExam.setExamDate(examDetails.getExamDate());
            examService.saveExam(existingExam);

            return ResponseEntity.ok(Result.success(existingExam, "Exam modified successfully!"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(500, "An error occurred"));
        }
    }
}