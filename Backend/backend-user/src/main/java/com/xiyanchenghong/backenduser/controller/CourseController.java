package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.Course;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.service.CourseService;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.service.serviceImpl.EmailService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/getCourseList")
    public Result<List<Course>> getCourseList(@RequestHeader("Authorization") String token) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token)) {
                return Result.error(403, "Token expired");
            }

            // 获取课程列表
            List<Course> courseList = courseService.getAllCourses();
            return Result.success(courseList);

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @GetMapping("/getCourseInfo")
    public Result<Course> getCourseInfo(@RequestHeader("Authorization") String token, @RequestParam("id") Long courseId) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token)) {
                return Result.error(403, "Token expired");
            }

            // 根据课程ID获取课程信息
            Course course = courseService.getCourseById(courseId);
            if (course != null) {
                return Result.success(course);
            } else {
                return Result.error(404, "Course not found");
            }

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/joinCourse")
    public Result<String> joinCourse(@RequestHeader("Authorization") String token, @RequestBody JoinCourseRequest joinCourseRequest) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token)) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID
            Long userId = Long.valueOf(claims.getSubject());

            // 添加选课信息
            boolean success = courseService.joinCourse(userId, joinCourseRequest.getCourseId());
            if (success) {
                return Result.success("Joined course successfully");
            } else {
                return Result.error(500, "Failed to join course");
            }

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/dropCourse")
    public Result<String> dropCourse(@RequestHeader("Authorization") String token, @RequestBody DropCourseRequest dropCourseRequest) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token)) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和邮箱
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null) {
                return Result.error(404, "用户不存在");
            }
            String email = user.getEmail();

            // 生成6位随机验证码
            String verificationCode = generateCaptcha();

            // 发送验证码到用户邮箱
            emailService.sendEmail(email, "课程退选验证码", "您的验证码是：" + verificationCode);

            // 将验证码存储在数据库中
            userService.storeCaptchaVerification(email, verificationCode);

            return Result.success("验证码已发送到您的邮箱，请查收");

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/verifyDropCourse")
    public Result<String> verifyDropCourse(@RequestHeader("Authorization") String token, @RequestBody VerifyDropCourseRequest verifyDropCourseRequest) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token)) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和邮箱
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null) {
                return Result.error(404, "用户不存在");
            }
            String email = user.getEmail();

            // 验证验证码
            boolean isCodeValid = userService.verifyCaptcha(email, verifyDropCourseRequest.getVerificationCode());
            if (!isCodeValid) {
                return Result.error(400, "验证码校验失败");
            }

            // 删除选课信息
            boolean success = courseService.dropCourse(userId, verifyDropCourseRequest.getCourseId());
            if (success) {
                return Result.success("课程退选成功");
            } else {
                return Result.error(500, "课程退选失败");
            }

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    private String generateCaptcha() {
        // 生成6位随机验证码
        return String.valueOf((int)((Math.random() * 9 + 1) * 100000));
    }
}