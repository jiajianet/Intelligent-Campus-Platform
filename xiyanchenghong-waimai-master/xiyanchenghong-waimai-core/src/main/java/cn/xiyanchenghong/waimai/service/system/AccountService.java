package cn.xiyanchenghong.waimai.service.system;

import cn.xiyanchenghong.waimai.cache.TokenCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * AccountService
 *
 */
@Service
public class AccountService {
    @Autowired
    private TokenCache tokenCache;
    @Autowired
    private UserService userService;



    public void logout(String token) {
        tokenCache.remove(token);
    }

}
