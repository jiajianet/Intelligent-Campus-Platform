package com.xiyanchenghong.backenduser.service.serviceImpl;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.domain.PasswordResetToken;
import com.xiyanchenghong.backenduser.forgotpassword.PasswordResetTokenRepository;
import com.xiyanchenghong.backenduser.model.BizException;
import com.xiyanchenghong.backenduser.repository.UserDao;
import com.xiyanchenghong.backenduser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.stereotype.Service;
import jakarta.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.time.ZonedDateTime;
import java.time.ZoneId;

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

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public User findUserByEmail(String email) {
        List<User> users = userDao.findByEmail(email);
        if (users.size() != 1) {
            throw new IncorrectResultSizeDataAccessException(1, users.size());
        }
        return users.get(0);
    }

    @Override
    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken myToken = new PasswordResetToken();
        myToken.setToken(token);
        myToken.setUser(user);
        ZonedDateTime expiryDateTime = ZonedDateTime.now(ZoneId.of("Asia/Shanghai")).plusHours(1); // 设置为北京时间
        myToken.setExpiryDateWithZone(expiryDateTime);
        tokenRepository.save(myToken);
    }

    @Override
    public void sendPasswordResetEmail(User user, String token) {
        String url = "http://127.0.0.1:8081/user/resetPassword?token=" + token;
        String subject = "【智慧校园服务平台】密码重置";
        String text = "您正在进行密码重置操作，请点击下面的链接进行重置:\n" + url +"\n若非本人申请，请忽略这封电子邮件并检查账号最近登录和操作行为是否有问题";
        emailService.sendEmail(user.getEmail(), subject, text);
    }

    @Override
    public String validatePasswordResetToken(String token) {
        PasswordResetToken passToken = tokenRepository.findByToken(token);
        if (passToken == null || passToken.getExpiryDate().before(new Date())) {
            return "invalidToken";
        }
        return null;
    }

    @Override
    public void changeUserPassword(User user, String newPassword) {
        user.setPassword(newPassword);
        userDao.save(user);
    }

    @Override
    public User findUserByPasswordResetToken(String token) {
        PasswordResetToken passToken = tokenRepository.findByToken(token);
        return passToken != null ? passToken.getUser() : null;
    }
}

