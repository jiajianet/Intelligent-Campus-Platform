package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.SignIn;
import com.xiyanchenghong.backenduser.mapper.SignInMapper;
import com.xiyanchenghong.backenduser.service.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignInServiceImpl implements SignInService {

    @Autowired
    private SignInMapper signInMapper;

    @Override
    public void beginSignIn(SignIn signIn) {
        signInMapper.save(signIn);
    }

    @Override
    public void endSignIn(SignIn signIn) {
        // 假设结束签到的逻辑是更新签到记录的状态
        SignIn existingSignIn = signInMapper.findById(signIn.getSignInId());
        if (existingSignIn != null) {
            existingSignIn.setStatus(false); // 设置状态为false表示签到结束
            signInMapper.updateStatus(existingSignIn.getSignInId(), existingSignIn.getStatus());
        }
    }

    @Override
    public void studentSignIn(SignIn signIn) {
        signInMapper.save(signIn);
    }
}