package com.xiyanchenghong.backenduser.service;
import com.xiyanchenghong.backenduser.domain.User;


public interface UserService {
    /**
     * 登录业务逻辑
     * @param uno 账户名
     * @param password 密码
     * @return
     */
    User loginService(String uno, String password);

    /**
     * 注册业务逻辑
     * @param user 要注册的User对象，属性中主键uid要为空，若uid不为空可能会覆盖已存在的user
     * @return
     */
    User registService(User user);

    User getUserInfo(Long uid); // 新增方法
}
