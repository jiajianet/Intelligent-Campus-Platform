package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.User;

import com.xiyanchenghong.backenduser.model.BizException;
import com.xiyanchenghong.backenduser.model.ResponseCodeEnum;
import com.xiyanchenghong.backenduser.repository.UserDao;
//import com.xiyanchenghong.backenduser.service.serviceImpl.UserService;
import com.xiyanchenghong.backenduser.service.UserService;
import org.springframework.stereotype.Service;
import jakarta.annotation.Resource;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserServicelmpl implements UserService {
    @Resource
    private UserDao userDao;

    @Override
    public User loginService(String uno, String password){
        // 如果账号密码都对则返回登录的用户对象，若有一个错误则返回null
        User user = userDao.findByUnoAndPassword(uno, password);
        // 重要信息置空
        if(user != null){
            user.setPassword("");
        }
        if (uno == null || password == null) {
            throw new BizException(ResponseCodeEnum.BIZ_CHECK_FAIL, "学号或密码不能为空");
        }
        return user;

    }
    @Override
    public User registService(User user){
        //当新用户的用户名已存在时
        if(userDao.findByUno(user.getUno())!= null){
            //无法注册
            return null;
        }else {
            //返回创建好的用户对象(带uid)
            User newUser = userDao.save(user);
            if(newUser != null){
                newUser.setPassword("");
            }
            if (newUser == null || newUser.getUno() == null) {
                throw new BizException(ResponseCodeEnum.BIZ_CHECK_FAIL, "用户信息不完整");
            }
            return newUser;
        }
    }

    @Service
    public class UserService {

        private final Map<String, Long> requestTimestamps = new ConcurrentHashMap<>();
        private static final long DEBOUNCE_TIME_MS = 3000; // 3秒防抖时间

        // 其他方法...

        public User loginService(String uno, String password) {
            if (isDebounced(uno)) {
                return null; // 或者抛出一个自定义异常
            }
            // 登录逻辑
            // 示例：假设成功登录返回用户对象
            User user = new User();
            user.setUno(uno);
            user.setPassword(password);
            // 其他用户信息设置
            return user;
        }

        public User registService(User newUser) {
            if (isDebounced(newUser.getUno())) {
                return null; // 或者抛出一个自定义异常
            }
            // 注册逻辑
            // 示例：假设成功注册返回用户对象
            User user = new User();
            user.setUno(newUser.getUno());
            user.setPassword(newUser.getPassword());
            // 其他用户信息设置
            return user;
        }



        private boolean isDebounced(String key) {
            long currentTime = System.currentTimeMillis();
            Long lastRequestTime = requestTimestamps.get(key);
            if (lastRequestTime == null || (currentTime - lastRequestTime) > DEBOUNCE_TIME_MS) {
                requestTimestamps.put(key, currentTime);
                return false;
            }
            return true;
        }
    }
}
