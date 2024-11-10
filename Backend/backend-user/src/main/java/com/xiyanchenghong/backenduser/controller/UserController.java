package com.xiyanchenghong.backenduser.controller;
import com.anji.captcha.model.common.ResponseModel;
import com.anji.captcha.model.vo.CaptchaVO;
import com.anji.captcha.service.CaptchaService;
import com.xiyanchenghong.backenduser.model.*;
import com.xiyanchenghong.backenduser.domain.*;
import com.xiyanchenghong.backenduser.model.RequestLock;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import com.xiyanchenghong.backenduser.repository.SchoolRepository;

@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;
    @Autowired
    private CaptchaService captchaService;
    @Autowired
    private SchoolRepository schoolRepository;

    @PostMapping("/login")
    @RequestLock(prefix = "login:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<User> loginController(@RequestKeyParam @RequestParam String uno, @RequestKeyParam @RequestParam String password,@RequestParam("captchaVerification") String captchaVerification) {
        CaptchaVO captchaVO = new CaptchaVO();
        captchaVO.setCaptchaVerification(captchaVerification);
        ResponseModel response = captchaService.verification(captchaVO);
        if (!response.isSuccess()) {
            return Result.error(400, "验证码校验失败！");
        }
        if (response.isSuccess() == true){
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
        return Result.error(-2, ""+response);
    }

    @PostMapping("/register")
    @RequestLock(prefix = "register:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<User> registController(@RequestBody @RequestKeyParam User newUser,@RequestParam("captchaVerification") String captchaVerification) {
        CaptchaVO captchaVO = new CaptchaVO();
        captchaVO.setCaptchaVerification(captchaVerification);
        ResponseModel response = captchaService.verification(captchaVO);
        System.out.println(response.isSuccess());
        if (!response.isSuccess()) {
            return Result.error(400, "验证码校验失败！");
        }
        if (newUser.getUname() == null || newUser.getUname().isEmpty()) {
            return Result.error(400, "用户名不能为空！");
        }
        if (response.isSuccess() == true) {
            User user = userService.registService(newUser);
            if (user != null) {
                Map<String, Object> claims = new HashMap<>();
                claims.put("uno", user.getUno());
                claims.put("uschool", user.getUschool());
                claims.put("uid", user.getUid());
                claims.put("uname", user.getUname()); // 新增字段
                claims.put("upic", user.getUpic());

                String jwt = JwtUtils.generateJwt(claims);
                return Result.success(user, "注册成功！", jwt);
            } else {
                return Result.error(409, "用户名已存在！");
            }
        }
        return Result.error(-2, ""+response);
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

    @PostMapping("/schools")
    @RequestLock(prefix = "schools:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public List<School> getSchools(@RequestParam String school) {
        return schoolRepository.findByNameContaining(school);
    }
}


