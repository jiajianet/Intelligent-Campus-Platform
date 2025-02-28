package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.Classroom;
import com.xiyanchenghong.backenduser.domain.ClassroomStudent;
import com.xiyanchenghong.backenduser.domain.SignIn;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.service.ClassroomService;
import com.xiyanchenghong.backenduser.service.SignInService;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/classroom")
public class ClassroomController {

    private static final Logger logger = LoggerFactory.getLogger(ClassroomController.class);

    @Autowired
    private ClassroomService classroomService;

    @Autowired
    private UserService userService;

    @Autowired
    private SignInService signInService;

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
            Long userId = JwtUtils.getUserIdFromToken(token.substring(7));
            if (userId == null) {
                return Result.error(403, "Invalid token");
            }
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
            e.printStackTrace();
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
            Long userId = JwtUtils.getUserIdFromToken(token.substring(7));
            if (userId == null) {
                return Result.error(403, "Invalid token");
            }
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
            Long userId = JwtUtils.getUserIdFromToken(token.substring(7));
            if (userId == null) {
                return Result.error(403, "Invalid token");
            }
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
            Long userId = JwtUtils.getUserIdFromToken(token.substring(7));
            if (userId == null) {
                return Result.error(403, "Invalid token");
            }
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

    @GetMapping("/getOngoingClassrooms")
    public Result<List<Classroom>> getOngoingClassrooms(@RequestHeader("Authorization") String token) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和角色
            Long userId = JwtUtils.getUserIdFromToken(token.substring(7));
            if (userId == null) {
                return Result.error(403, "Invalid token");
            }

            User user = userService.getUserById(userId);
            if (user == null) {
                return Result.error(403, "Unauthorized");
            }

            List<Classroom> ongoingClassrooms;
            if (user.getRole() == User.Role.TEACHER) {
                // 获取教师创建的正在上课的教室
                ongoingClassrooms = classroomService.getOngoingClassroomsByTeacherId(userId);
            } else if (user.getRole() == User.Role.STUDENT) {
                // 获取学生参加的正在上课的教室
                ongoingClassrooms = classroomService.getOngoingClassroomsByStudentId(userId);
            } else {
                return Result.error(403, "Unauthorized");
            }

            return Result.success(ongoingClassrooms);

        } catch (Exception e) {
            e.printStackTrace();
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/raiseHand")
    public Result<String> raiseHand(@RequestHeader("Authorization") String token, @RequestParam Long studentId) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID
            Long userId = JwtUtils.getUserIdFromToken(token.substring(7));
            if (userId == null) {
                return Result.error(403, "Invalid token");
            }
            User user = userService.getUserById(userId);
            if (user == null) {
                return Result.error(403, "Unauthorized");
            }

            // 学生举手
            classroomService.raiseHand(studentId);

            return Result.success("Hand raised successfully!");

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @GetMapping("/getRaisedHands")
    public Result<List<User>> getRaisedHands(@RequestHeader("Authorization") String token, @RequestParam Long classroomId) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户ID和角色
            Long userId = JwtUtils.getUserIdFromToken(token.substring(7));
            if (userId == null) {
                return Result.error(403, "Invalid token");
            }
            User user = userService.getUserById(userId);
            if (user == null) {
                return Result.error(403, "Unauthorized");
            }

            // 获取举手学生名单
            List<User> raisedHands = classroomService.getRaisedHands(classroomId);
            return Result.success(raisedHands);

        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    @PostMapping("/beginSignIn")
    public Result<String> beginSignIn(@RequestHeader("Authorization") String token, @RequestBody SignIn signIn) {
        try {
            // 验证 token
            Claims claims = JwtUtils.parseJwt(token.substring(7)); // 移除 "Bearer " 前缀
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户 ID 和角色
            Long userId = JwtUtils.getUserIdFromToken(token.substring(7));
            if (userId == null) {
                return Result.error(403, "Invalid token");
            }
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
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取用户 ID 和角色
            Long userId = JwtUtils.getUserIdFromToken(token.substring(7));
            if (userId == null) {
                return Result.error(403, "Invalid token");
            }
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