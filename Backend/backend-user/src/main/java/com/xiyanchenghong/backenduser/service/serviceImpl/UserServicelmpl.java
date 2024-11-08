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
    public User registService(User user) {
        if (userDao.findByUno(user.getUno()) != null) {
            return null;
        } else {
            User newUser = userDao.save(user);
            if (newUser != null) {
                newUser.setPassword("");
            }
            if (newUser == null || newUser.getUno() == null) {
                throw new BizException(ResponseCodeEnum.BIZ_CHECK_FAIL, "用户信息不完整");
            }
            return newUser;
        }
    }

    @Override
    public User getUserInfo(Long uid) {
        return userDao.findById(uid).orElse(null);
    }
}

