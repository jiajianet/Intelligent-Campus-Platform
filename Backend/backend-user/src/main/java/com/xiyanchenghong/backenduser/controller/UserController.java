package com.xiyanchenghong.backenduser.controller;
import com.anji.captcha.model.common.ResponseModel;
import com.anji.captcha.model.vo.CaptchaVO;
import com.anji.captcha.service.CaptchaService;
import com.xiyanchenghong.backenduser.domain.CompleteRegistrationRequest;
import com.xiyanchenghong.backenduser.domain.School;
import com.xiyanchenghong.backenduser.domain.UserRegistrationRequest;
import com.xiyanchenghong.backenduser.model.*;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.model.RequestLock;
import com.xiyanchenghong.backenduser.repository.SchoolRepository;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import io.jsonwebtoken.Claims;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.Resource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;
    @Resource
    private CaptchaService captchaService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private RedissonClient redissonClient;
    @PostMapping("/login")
    @RequestLock(prefix = "login:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<User> loginController(@RequestKeyParam @RequestParam String uno, @RequestKeyParam @RequestParam String password, @RequestParam("captchaVerification") String captchaVerification) {
        CaptchaVO captchaVO = new CaptchaVO();
        captchaVO.setCaptchaVerification(captchaVerification);
        ResponseModel response = captchaService.verification(captchaVO);
        if (!response.isSuccess()) {
            return Result.error(400, "验证码校验失败！");
        }
        if (response.isSuccess() == true) {
            User user = userService.loginService(uno, password);
            if (user != null) {
                Map<String, Object> claims = new HashMap<>();
                claims.put("uno", user.getUno());
                claims.put("uschool", user.getUschool());
                claims.put("uid", user.getUid());
                claims.put("uname", user.getUname()); // 新增字段
                claims.put("upic", user.getUpic());
                String jwt = JwtUtils.generateJwt(claims);
                return Result.success(user, "登录成功！", jwt);
            } else {
                return Result.error(-1, "账号或密码错误！");
            }
        }
        return Result.error(-2, "" + response);
    }


    @PostMapping("/register")
    @RequestLock(prefix = "register:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<String> initiateRegistration(@RequestBody UserRegistrationRequest request) {

        if (request.getUname() == null || request.getUname().isEmpty()) {
            return Result.error(400, "用户名不能为空！");
        }
        if (userService.checkEmailExistsForRegistration(request.getEmail())) {
            return Result.error(409, "邮箱已存在！");
        }

        // 生成验证码
        String EmailcaptchaVerification = generateCaptcha();
        // 发送验证邮件
        userService.sendEmailVerificationEmail(request.getEmail(), EmailcaptchaVerification);

        // 将验证码存储在缓存或数据库中，关联到用户的 email
        userService.storeCaptchaVerification(request.getEmail(), EmailcaptchaVerification);

        return Result.success("验证码已发送到您的邮箱，请查收！");
    }

    @PostMapping("/completeRegistration")
    public Result<User> completeRegistration(@RequestBody CompleteRegistrationRequest request) {
        if (!userService.verifyCaptcha(request.getEmail(), request.getCaptchaVerification())) {
            return Result.error(400, "验证码校验失败！");
        }

        User user = new User();
        user.setUno(request.getUno());
        user.setUschool(request.getUschool());
        user.setPassword(request.getPassword());
        user.setUname(request.getUname());
        user.setEmail(request.getEmail());
        user.setEmailVerified(true); // 设置邮箱已验证
        User newUser = userService.registService(user);
        if (newUser != null) {
            // 生成 JWT token
            Map<String, Object> claims = new HashMap<>();
            claims.put("uno", newUser.getUno());
            claims.put("uschool", newUser.getUschool());
            claims.put("uid", newUser.getUid());
            claims.put("uname", newUser.getUname());
            claims.put("upic", newUser.getUpic());
            String jwt = JwtUtils.generateJwt(claims);

            return Result.success(newUser, "注册成功！", jwt);
        } else {
            return Result.error(409, "用户名已存在！");
        }
    }


    private String generateCaptcha() {
        // 生成6位随机验证码
        return String.valueOf((int)((Math.random() * 9 + 1) * 100000));
    }



    @PostMapping("/getUserInfo")
    @RequestLock(prefix = "getUserInfo:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<User> getUserInfo(@RequestParam("token") String token) {
        if (token != null) {
            try {
                Claims claims = JwtUtils.parseJwt(token);
                Long uid = claims.get("uid", Long.class);
                User user = userService.getUserInfo(uid);
                if (user != null) {
                    return Result.success(user, "查询成功！");
                } else {
                    return Result.error(404, "用户不存在！");
                }
            } catch (Exception e) {
                return Result.error(403, "无效的令牌");
            }
        } else {
            return Result.error(403, "令牌缺失");
        }
    }


    @PostMapping("/forgotPassword")
    @RequestLock(prefix = "forgotPassword:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<String> forgotPassword(@RequestParam("email") String userEmail) {
//        CaptchaVO captchaVO = new CaptchaVO();
//        captchaVO.setCaptchaVerification(captchaVerification);
//        ResponseModel response = captchaService.verification(captchaVO);
//        if (!response.isSuccess()) {
//            return Result.error(400, "验证码校验失败！");
//        }

        User user = userService.findUserByEmailForPasswordReset(userEmail);
        if (user == null) {
            return Result.error(404, "用户不存在");
        }

        // 生成6位随机验证码
        String EmailcaptchaVerification = generateCaptcha();
        // 发送验证码邮件
        userService.sendPasswordResetEmail(user, EmailcaptchaVerification);

        // 将验证码存储在数据库中，关联到用户的 email
        userService.storeCaptchaVerification(userEmail, EmailcaptchaVerification);

//        logger.info("Password reset email sent to: {}", userEmail);
        return Result.success("验证码已发送到您的邮箱，请查收！");
    }

    @PostMapping("/resetPasswordWithCaptcha")
    public Result<String> resetPasswordWithCaptcha(@RequestParam("email") String email,
                                                   @RequestParam("EmailcaptchaVerification") String EmailcaptchaVerification,
                                                   @RequestParam("newPassword") String newPassword) {
        if (!userService.verifyCaptcha(email, EmailcaptchaVerification)) {
            return Result.error(400, "验证码校验失败！");
        }

        User user = userService.findUserByEmail(email);
        if (user == null) {
            return Result.error(404, "用户不存在");
        }

        userService.changeUserPassword(user, newPassword);
        return Result.success("密码重置成功");
    }


    @PostMapping("/schools")
    public List<School> getSchools(@RequestParam String school) {
        return schoolRepository.findByNameContaining(school);
    }


    @DeleteMapping("/deleteAccount")
    @RequestLock(prefix = "deleteAccount:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<String> initiateDeleteAccount(@RequestParam("uno") String uno, @RequestParam("email") String email) {
        User user = userService.findUserByUnoAndEmail(uno, email);
        if (user == null) {
            return Result.error(404, "用户不存在");
        }

        // 生成6位随机验证码
        String EmailcaptchaVerification = generateCaptcha();
        // 发送验证码邮件
        userService.sendDeleteAccountEmail(user, EmailcaptchaVerification);

        // 将验证码存储在数据库中，关联到用户的 email
        userService.storeCaptchaVerification(email, EmailcaptchaVerification);

        logger.info("Delete account email sent to: {}", email);
        return Result.success("验证码已发送到您的邮箱，请查收！");
    }

    @PostMapping("/completeDeleteAccount")
    public Result<String> completeDeleteAccount(@RequestParam("uno") String uno,
                                                @RequestParam("email") String email,
                                                @RequestParam("EmailcaptchaVerification") String EmailcaptchaVerification) {
        if (!userService.verifyCaptcha(email, EmailcaptchaVerification)) {
            return Result.error(400, "验证码校验失败！");
        }

        User user = userService.findUserByUnoAndEmail(uno, email);
        if (user == null) {
            return Result.error(404, "用户不存在");
        }

        userService.deleteAccountByUno(uno);
        return Result.success("账户注销成功");
    }


    @PostMapping("/verifyEmail")
    public String verifyEmail(@RequestParam("token") String token) {
        String result = userService.validateEmailVerificationToken(token);
        if (result != null) {
            return "无效的令牌";
        }
        return "邮箱验证成功";
    }


    @PostMapping("/saveUserSchedule")
    public Result<String> saveUserSchedule(@RequestParam("token") String token, @RequestBody String scheduleJson) {
        // 验证Token
        Claims claims;
        try {
            claims = jwtUtils.parseJwt(token);
            if (jwtUtils.isTokenExpired(token)) {
                return Result.error(403, "Token expired");
            }
        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }

        // 获取用户信息
        Long uid = claims.get("uid", Long.class);
        User user = userService.getUserInfo(uid);
        if (user == null) {
            return Result.error(404, "User not found");
        }

        // 保存JSON文件
        String fileName = "schedule_" + uid + ".json";
        String filePath = System.getProperty("user.dir") + "/schedules/" + fileName; // 使用外部目录
        try {
            Files.createDirectories(Paths.get(System.getProperty("user.dir") + "/schedules/")); // 确保目录存在
            Files.write(Paths.get(filePath), scheduleJson.getBytes(StandardCharsets.UTF_8));
        } catch (IOException e) {
            logger.error("Error saving schedule file", e);
            return Result.error(500, "Error saving schedule file");
        }

        // 更新数据库中的文件路径
        user.setSchedfile(filePath);
        userService.updateUser(user);

        return Result.success("Schedule saved successfully");
    }


    @PostMapping("/getUserScheduleList")
    @RequestLock(prefix = "getUserScheduleList:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<String> getUserScheduleList(@RequestParam("token") String token) {
        // 验证Token
        Claims claims;
        try {
            claims = jwtUtils.parseJwt(token);
            if (jwtUtils.isTokenExpired(token)) {
                return Result.error(403, "Token expired");
            }
        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }

        // 防抖功能
        boolean isLocked = false;
        RLock lock = redissonClient.getLock("getUserScheduleList:" + claims.get("uid"));
        try {
            isLocked = lock.tryLock();
            if (!isLocked) {
                return Result.error(403, "Too many requests");
            }

            // 获取用户的课程表文件路径
            Long uid = claims.get("uid", Long.class);
            User user = userService.getUserInfo(uid);
            if (user == null || user.getSchedfile() == null) {
                return Result.error(404, "Schedule file not found");
            }

            // 读取JSON文件内容
            String schedfilePath = user.getSchedfile();
            String jsonContent = new String(Files.readAllBytes(Paths.get(schedfilePath)), StandardCharsets.UTF_8);

            // 返回JSON数据
            return Result.success(jsonContent, "Schedule retrieved successfully");

        } catch (IOException e) {
            logger.error("Error reading schedule file", e);
            return Result.error(500, "Error reading schedule file");
        } finally {
            if (isLocked && lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }
}



