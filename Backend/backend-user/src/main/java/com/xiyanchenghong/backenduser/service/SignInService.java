package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.SignIn;

public interface SignInService {
    void beginSignIn(SignIn signIn);
    void endSignIn(SignIn signIn);
    void studentSignIn(SignIn signIn);
}