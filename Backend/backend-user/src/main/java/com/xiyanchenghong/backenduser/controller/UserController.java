package com.xiyanchenghong.backenduser.controller;
import com.xiyanchenghong.backenduser.model.*;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.model.RequestLock;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.Resource;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;


@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;

    @PostMapping("/login")
    @RequestLock(prefix = "login:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<User> loginController(@RequestKeyParam @RequestParam String uno, @RequestKeyParam @RequestParam String password) {
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
            return Result.error("-1", "账号或密码错误！");
        }
    }

    @PostMapping("/register")
    @RequestLock(prefix = "register:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<User> registController(@RequestBody @RequestKeyParam User newUser) {
        if (newUser.getUname() == null || newUser.getUname().isEmpty()) {
            return Result.error("456", "用户名不能为空！");
        }
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
            return Result.error("456", "用户名已存在！");
        }
    }

    @PostMapping("/info")
    public Result<User> getUserInfo(@RequestParam Long uid) {
        User user = userService.getUserInfo(uid);
        if (user != null) {
            return Result.success(user, "查询成功！");
        } else {
            return Result.error("404", "用户不存在！");
        }
    }
}