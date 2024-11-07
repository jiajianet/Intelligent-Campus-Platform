package com.xiyanchenghong.backenduser.controller;
import com.xiyanchenghong.backenduser.model.*;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.model.RequestLock;
import com.xiyanchenghong.backenduser.service.UserService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import org.redisson.api.RedissonClient;
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

    @Resource
    private RedissonClient redissonClient;

    @PostMapping("/login")
    @RequestLock(prefix = "login:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<User> loginController(@RequestKeyParam @RequestParam String uno, @RequestKeyParam @RequestParam String password) {
        User user = userService.loginService(uno, password);
        if (user != null) {
            Map<String, Object> map = new HashMap<>();
            map.put("uno", user.getUno());
            map.put("uschool", user.getUschool());
            map.put("uid", user.getUid());

            String jwt = JwtUtils.generateJwt(map);
            return Result.success(user, "登录成功！", jwt);
        } else {
            return Result.error("1", "账号或密码错误！");
        }
    }

    @PostMapping("/register")
    @RequestLock(prefix = "register:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<User> registController(@RequestBody @RequestKeyParam User newUser) {
        User user = userService.registService(newUser);
        if (user != null) {
            return Result.success(user, "注册成功！");
        } else {
            return Result.error("456", "用户名已存在！");
        }
    }
}
