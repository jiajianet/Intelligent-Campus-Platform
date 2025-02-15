package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.Exam;
import com.xiyanchenghong.backenduser.domain.ExamData;
import com.xiyanchenghong.backenduser.domain.ExamSubmission;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.service.ExamService;
import com.xiyanchenghong.backenduser.service.ExamDataService;
import com.xiyanchenghong.backenduser.service.ExamSubmissionService;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private ExamDataService examDataService;

    @Autowired
    private ExamSubmissionService examSubmissionService;

    @Autowired
    private UserService userService;

    @GetMapping("/getExaminfo/{examId}")
    public ResponseEntity<Result<Exam>> getExaminfo(@RequestHeader("Authorization") String token, @PathVariable Long examId) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Token expired"));
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.STUDENT) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Unauthorized"));
            }

            // 获取考试信息
            Exam exam = examService.getExamById(examId);
            if (exam == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(404, "Exam not found"));
            }
            return ResponseEntity.ok(Result.success(exam));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(500, "An error occurred"));
        }
    }

    @GetMapping("/getExamData/{examId}")
    public ResponseEntity<Result<ExamData>> getExamData(@RequestHeader("Authorization") String token, @PathVariable Long examId) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Token expired"));
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.STUDENT) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Unauthorized"));
            }

            // 获取考试数据
            ExamData examData = examDataService.getExamData(examId, userId);
            if (examData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(404, "Exam data not found"));
            }
            return ResponseEntity.ok(Result.success(examData));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(500, "An error occurred"));
        }
    }

    @PutMapping("/updateLatestData/{examId}")
    public ResponseEntity<Result<String>> updateLatestData(@RequestHeader("Authorization") String token, @PathVariable Long examId, @RequestBody ExamData newExamData) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Token expired"));
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.STUDENT) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Unauthorized"));
            }

            // 更新考试数据
            ExamData existingExamData = examDataService.getExamData(examId, userId);
            if (existingExamData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(404, "Exam data not found"));
            }
            existingExamData.setData(newExamData.getData());
            examDataService.updateExamData(existingExamData);

            return ResponseEntity.ok(Result.success("Exam data updated successfully!"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(500, "An error occurred"));
        }
    }

    @PostMapping("/submitExam")
    public ResponseEntity<Result<String>> submitExam(@RequestHeader("Authorization") String token, @RequestBody ExamSubmission examSubmission) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Token expired"));
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.STUDENT) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Unauthorized"));
            }

            // 设置学生 ID
            examSubmission.setStudentId(userId);

            // 提交考试
            examSubmissionService.submitExam(examSubmission);

            return ResponseEntity.ok(Result.success("Exam submitted successfully!"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Result.error(500, "An error occurred"));
        }
    }
}