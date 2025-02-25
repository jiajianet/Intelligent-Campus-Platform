package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.Course;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.service.CourseService;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.service.serviceImpl.EmailService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    private static final Logger logger = LoggerFactory.getLogger(CourseController.class);

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
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取课程列表
            List<Course> courseList = courseService.getAllCourses();
            return Result.success(courseList);

        } catch (Exception e) {
            logger.error("Token validation error", e);
            return Result.error(403, "Invalid token");
        }
    }

    @GetMapping("/getCourseInfo")
    public Result<CourseInfoResponse> getCourseInfo(@RequestHeader("Authorization") String token, @RequestParam("id") Long courseId) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID
            String userIdStr = claims.getSubject();
            if (userIdStr == null) {
                logger.error("Token does not contain subject (userId)");
                return Result.error(403, "Invalid token");
            }

            Long userId;
            try {
                userId = Long.valueOf(userIdStr);
            } catch (NumberFormatException e) {
                logger.error("Unable to convert userId to Long: " + userIdStr, e);
                return Result.error(403, "Invalid token");
            }

            // 根据课程ID获取课程信息
            Course course = courseService.getCourseById(courseId);
            if (course != null) {
                // 验证请求者是否为课程的教师
                if (!course.getTeacherId().equals(userId)) {
                    return Result.error(403, "Access denied");
                }

                String coverImageBase64 = null;
                if (course.getCoverImagePath() != null) {
                    try {
                        byte[] imageBytes = Files.readAllBytes(Paths.get(course.getCoverImagePath()));
                        coverImageBase64 = Base64.getEncoder().encodeToString(imageBytes);
                    } catch (IOException e) {
                        return Result.error(500, "Error reading cover image file");
                    }
                }
                CourseInfoResponse response = new CourseInfoResponse(course, coverImageBase64);
                return Result.success(response);
            } else {
                return Result.error(404, "Course not found");
            }

        } catch (Exception e) {
            logger.error("Error retrieving course info", e);
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/joinCourse")
    public Result<String> joinCourse(@RequestHeader("Authorization") String token, @RequestBody JoinCourseRequest joinCourseRequest) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token.substring(7))) {
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
            logger.error("Error joining course", e);
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/dropCourse")
    public Result<String> dropCourse(@RequestHeader("Authorization") String token, @RequestBody DropCourseRequest dropCourseRequest) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和邮箱
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null) {
                return Result.error(404, "User not found");
            }
            String email = user.getEmail();

            // 生成6位随机验证码
            String verificationCode = generateCaptcha();

            // 发送验证码到用户邮箱
            emailService.sendEmail(email, "Course Drop Verification Code", "Your verification code is: " + verificationCode);

            // 将验证码存储在数据库中
            userService.storeCaptchaVerification(email, verificationCode);

            return Result.success("Verification code has been sent to your email");

        } catch (Exception e) {
            logger.error("Error dropping course", e);
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/verifyDropCourse")
    public Result<String> verifyDropCourse(@RequestHeader("Authorization") String token, @RequestBody VerifyDropCourseRequest verifyDropCourseRequest) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和邮箱
            Long userId = Long.valueOf(claims.getSubject());
            User user = userService.getUserById(userId);
            if (user == null) {
                return Result.error(404, "User not found");
            }
            String email = user.getEmail();

            // 验证验证码
            boolean isCodeValid = userService.verifyCaptcha(email, verifyDropCourseRequest.getVerificationCode());
            if (!isCodeValid) {
                return Result.error(400, "Verification code validation failed");
            }

            // 删除选课信息
            boolean success = courseService.dropCourse(userId, verifyDropCourseRequest.getCourseId());
            if (success) {
                return Result.success("Course dropped successfully");
            } else {
                return Result.error(500, "Failed to drop course");
            }

        } catch (Exception e) {
            logger.error("Error verifying drop course", e);
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/createCourse")
    public Result<Course> createCourse(@RequestHeader("Authorization") String token, @RequestBody Course course) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 创建课程
            Course createdCourse = courseService.createCourse(course);
            return Result.success(createdCourse);

        } catch (Exception e) {
            logger.error("Error creating course", e);
            return Result.error(403, "Invalid token");
        }
    }

    @DeleteMapping("/deleteCourse")
    public Result<String> deleteCourse(@RequestHeader("Authorization") String token, @RequestParam("id") Long courseId) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 删除课程
            boolean success = courseService.deleteCourse(courseId);
            if (success) {
                return Result.success("Course deleted successfully");
            } else {
                return Result.error(404, "Course not found");
            }

        } catch (Exception e) {
            logger.error("Error deleting course", e);
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/uploadCourseCover")
    public Result<String> uploadCourseCover(@RequestHeader("Authorization") String token, @RequestParam("courseId") Long courseId, @RequestBody String base64Cover) {
        // 验证Token
        Claims claims;
        try {
            claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }
        } catch (Exception e) {
            logger.error("Token validation error", e);
            return Result.error(403, "Invalid token");
        }

        // 获取课程信息
        Course course = courseService.getCourseById(courseId);
        if (course == null) {
            return Result.error(404, "Course not found");
        }

        // 保存封面文件
        String fileName = "course_cover_" + courseId + ".png";
        String filePath = System.getProperty("user.dir") + "/course_covers/" + fileName; // 使用外部目录
        try {
            Files.createDirectories(Paths.get(System.getProperty("user.dir") + "/course_covers/")); // 确保目录存在
            byte[] imageBytes = Base64.getDecoder().decode(base64Cover);
            Files.write(Paths.get(filePath), imageBytes, StandardOpenOption.CREATE);
        } catch (IOException e) {
            logger.error("Error saving course cover file", e);
            return Result.error(500, "Error saving course cover file");
        }

        // 更新数据库中的封面路径
        course.setCoverImagePath(filePath);
        courseService.updateCourse(course);

        return Result.success("Course cover uploaded successfully");
    }

    private String generateCaptcha() {
        // 生成6位随机验证码
        return String.valueOf((int)((Math.random() * 9 + 1) * 100000));
    }

    private static class CourseInfoResponse {
        private Long courseId;
        private String courseName;
        private String courseDescription;
        private Long teacherId;
        private String coverImageBase64;
        private Date startDate;
        private Date endDate;
        private int progress;

        public CourseInfoResponse(Course course, String coverImageBase64) {
            this.courseId = course.getCourseId();
            this.courseName = course.getCourseName();
            this.courseDescription = course.getCourseDescription();
            this.teacherId = course.getTeacherId();
            this.startDate = course.getStartDate();
            this.endDate = course.getEndDate();
            this.progress = course.getProgress();
            this.coverImageBase64 = coverImageBase64;
        }

    }
}