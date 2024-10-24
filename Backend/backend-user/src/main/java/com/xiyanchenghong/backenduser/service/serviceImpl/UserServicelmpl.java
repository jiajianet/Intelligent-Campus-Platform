package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.repository.UserDao;
//import com.xiyanchenghong.backenduser.service.serviceImpl.UserService;
import com.xiyanchenghong.backenduser.service.UserService;
import org.springframework.stereotype.Service;
import jakarta.annotation.Resource;

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
            return newUser;
        }
    }
}
