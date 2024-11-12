package com.xiyanchenghong.backenduser.service.serviceImpl;
import com.xiyanchenghong.backenduser.domain.EmailVerificationToken;
import com.xiyanchenghong.backenduser.domain.EmailVerificationTokenRepository;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.domain.PasswordResetToken;
import com.xiyanchenghong.backenduser.forgotpassword.PasswordResetTokenRepository;
import com.xiyanchenghong.backenduser.model.BizException;
import com.xiyanchenghong.backenduser.repository.UserDao;
import com.xiyanchenghong.backenduser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import jakarta.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.util.Map;
import java.util.concurrent.TimeUnit;

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
            System.out.println(users.size());
            throw new IncorrectResultSizeDataAccessException(1, users.size());
        }
        return users.get(0);
    }

    @Override
    public boolean checkEmailExistsForRegistration(String email) {
        List<User> users = userDao.findByEmail(email);
        return !users.isEmpty();
    }

    @Override
    public User findUserByEmailForPasswordReset(String email) {
        List<User> users = userDao.findByEmail(email);
        if (users.isEmpty()) {
            return null;
        }
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
//        String url = "http://127.0.0.1:8081/user/resetPassword?token=" + token;
        String subject = "【智慧校园服务平台】密码重置";
        String text = "您正在进行密码重置操作，你的验证码是:" + token +"\n若非本人申请，请忽略这封电子邮件并检查账号最近登录和操作行为是否有问题";
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

    @Override
    public void deleteAccountByUno(String uno) {
        User user = userDao.findByUno(uno);
        if (user != null) {
            userDao.delete(user);//级联删除数据库外键约束相关记录
        }
    }

    @Autowired
    private EmailVerificationTokenRepository emailVerificationTokenRepository;

    @Override
    public void createEmailVerificationTokenForUser(User user, String token) {
        EmailVerificationToken myToken = new EmailVerificationToken();
        myToken.setToken(token);
        myToken.setUser(user);
        ZonedDateTime expiryDateTime = ZonedDateTime.now(ZoneId.of("Asia/Shanghai")).plusHours(24); // 设置为24小时有效
        myToken.setExpiryDateWithZone(expiryDateTime);
        emailVerificationTokenRepository.save(myToken);
    }

    @Override
    public void sendEmailVerificationEmail(User user, String token) {
        String url = "http://127.0.0.1:8081/user/verifyEmail?token=" + token;
        String subject = "【智慧校园服务平台】邮箱验证";
        String text = "请点击下面的链接以验证您的邮箱:\n" + url + "\n若非本人申请，请忽略这封电子邮件。";
        emailService.sendEmail(user.getEmail(), subject, text);
    }

    @Override
    public String validateEmailVerificationToken(String token) {
        EmailVerificationToken verificationToken = emailVerificationTokenRepository.findByToken(token);
        if (verificationToken == null || verificationToken.getExpiryDate().before(new Date())) {
            return "invalidToken";
        }
        User user = verificationToken.getUser();
        user.setEmailVerified(false);
        userDao.save(user);
        return null;
    }


    private Map<String, String> captchaStore = new HashMap<>();
    @Override
    public void sendEmailVerificationEmail(String email, String captchaVerification) {
        String subject = "【智慧校园服务平台】邮箱验证";
        String text = "您的验证码是：" + captchaVerification + "。请在10分钟内完成验证。";
        emailService.sendEmail(email, subject, text);
    }

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public void storeCaptchaVerification(String email, String captchaVerification) {
        // 存储验证码，并设置10分钟过期时间
        stringRedisTemplate.opsForValue().set(email, captchaVerification, 10, TimeUnit.MINUTES);
    }

    @Override
    public boolean verifyCaptcha(String email, String captchaVerification) {
        String storedCaptcha = stringRedisTemplate.opsForValue().get(email);
        return captchaVerification.equals(storedCaptcha);
    }

    @Override
    public void sendDeleteAccountEmail(User user, String captchaVerification) {
        String subject = "【智慧校园服务平台】账户注销";
        String text = "您的验证码是：" + captchaVerification + "。请在10分钟内完成验证以注销您的账户。";
        emailService.sendEmail(user.getEmail(), subject, text);
    }

    @Override
    public User findUserByUnoAndEmail(String uno, String email) {
        return userDao.findByUnoAndEmail(uno, email);
    }
}

