package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.Assignment;
import com.xiyanchenghong.backenduser.domain.AssignmentData;
import com.xiyanchenghong.backenduser.domain.AssignmentSubmission;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.service.AssignmentService;
import com.xiyanchenghong.backenduser.service.AssignmentDataService;
import com.xiyanchenghong.backenduser.service.AssignmentSubmissionService;
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
public class StudentAssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private AssignmentDataService assignmentDataService;

    @Autowired
    private AssignmentSubmissionService assignmentSubmissionService;

    @Autowired
    private UserService userService;

    @GetMapping("/getAssignmentInfo/{assignmentId}")
    public ResponseEntity<Result<Assignment>> getAssignmentInfo(@RequestHeader("Authorization") String token, @PathVariable Long assignmentId) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Token expired"));
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.STUDENT) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Unauthorized"));
            }

            // 获取作业信息
            Assignment assignment = assignmentService.getAssignmentInfo(assignmentId);
            if (assignment == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(404, "Assignment not found"));
            }
            return ResponseEntity.ok(Result.success(assignment));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Invalid token"));
        }
    }

    @GetMapping("/getAssignmentData/{assignmentId}")
    public ResponseEntity<Result<AssignmentData>> getAssignmentData(@RequestHeader("Authorization") String token, @PathVariable Long assignmentId) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Token expired"));
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.STUDENT) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Unauthorized"));
            }

            // 获取作业数据
            AssignmentData assignmentData = assignmentDataService.getAssignmentData(assignmentId, userId);
            if (assignmentData == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Result.error(404, "Assignment data not found"));
            }
            return ResponseEntity.ok(Result.success(assignmentData));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Invalid token"));
        }
    }

    @PostMapping("/submitAssignment")
    public ResponseEntity<Result<String>> submitAssignment(@RequestHeader("Authorization") String token, @RequestBody AssignmentSubmission submission) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Token expired"));
            }

            // 获取用户 ID 和角色
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null || user.getRole() != User.Role.STUDENT) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Unauthorized"));
            }

            // 设置学生 ID
            submission.setStudentId(userId);

            // 提交作业
            assignmentSubmissionService.submitAssignment(submission);

            return ResponseEntity.ok(Result.success("Assignment submitted successfully!"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Result.error(403, "Invalid token"));
        }
    }
}