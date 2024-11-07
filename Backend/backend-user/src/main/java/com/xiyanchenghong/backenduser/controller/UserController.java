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
public class  UserController {
    @Resource
    private UserService userService;

    @Resource
    private RedissonClient redissonClient;

//    private static final String LOGIN_KEY_PREFIX = "login:";
//    private static final String REGISTER_KEY_PREFIX = "register:";
//    private static final long DEBOUNCE_TIME = 5; // 防抖时间，单位：秒

    @PostMapping("/login")
    @RequestLock(prefix = "login:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<User> loginController( @RequestParam String uno,  @RequestParam String password){

//        String key = LOGIN_KEY_PREFIX + uno;
//        RBucket<Object> bucket = redissonClient.getBucket(key);
//        if (bucket.isExists()) {
//            return Result.error("429", "请求过于频繁，请稍后再试！");
//        }
//
//        bucket.set("", DEBOUNCE_TIME, TimeUnit.SECONDS);

        User user = userService.loginService(uno, password);
        if(user!=null){
            //不放敏感内容
            Map<String,Object> map = new HashMap<>();
            map.put("uno",user.getUno());
//            map.put("password",user.getPassword());//这个要考虑是否要放到令牌中
            map.put("uschool",user.getUschool());
            map.put("uid",user.getUid());

            //生成JWT令牌
            String jwt =  JwtUtils.generateJwt(map);
//            return Result.success(user,"登录成功！");
            return Result.success(user,"登录成功！",jwt);
        } else {
            //前端自动跳转登陆页面
            return Result.error("1","账号或密码错误！");
        }


    }

    @PostMapping("/register")
    @RequestLock(prefix = "register:", expire = 5, timeUnit = TimeUnit.SECONDS)
    public Result<User> registController(@RequestBody  User newUser){
//        String key = REGISTER_KEY_PREFIX + newUser.getUno();
//        RBucket<Object> bucket = redissonClient.getBucket(key);
//        if (bucket.isExists()) {
//            return Result.error("429", "请求过于频繁，请稍后再试！");
//        }
//        bucket.set("", DEBOUNCE_TIME, TimeUnit.SECONDS);
//
        User user = userService.registService(newUser);
        if(user!=null){
            return Result.success(user,"注册成功！");
        }else{
            return Result.error("456","用户名已存在！");
        }
    }


}
