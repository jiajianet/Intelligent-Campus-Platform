package com.xiyanchenghong.backenduser.service.serviceImpl;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.model.BizException;
import com.xiyanchenghong.backenduser.model.ResponseCodeEnum;
import com.xiyanchenghong.backenduser.repository.UserDao;
import com.xiyanchenghong.backenduser.service.UserService;
import org.springframework.stereotype.Service;
import jakarta.annotation.Resource;

@Service
public class UserServicelmpl implements UserService {
    @Resource
    private UserDao userDao;

    @Override
    public User loginService(String uno, String password) {
        User user = userDao.findByUnoAndPassword(uno, password);
        if (user != null) {
            user.setPassword("");
        }
        if (uno == null || password == null) {
            throw new BizException(400, "学号或密码不能为空");
        }
        return user;
    }

    @Override
    public User registService(User user) {
        if (userDao.findByUno(user.getUno()) != null) {
            return null;
        } else {
            if (user.getUpic() == null || user.getUpic().isEmpty()) {
                user.setUpic("default_avatar.png"); // 设置默认头像
            }
            User newUser = userDao.save(user);
            if (newUser != null) {
                newUser.setPassword("");
            }
            if (newUser == null || newUser.getUno() == null) {
                throw new BizException(400, "用户信息不完整");
            }
            return newUser;
        }
    }

    @Override
    public User getUserInfo(Long uid) {
        return userDao.findById(uid).orElse(null);
    }
}

