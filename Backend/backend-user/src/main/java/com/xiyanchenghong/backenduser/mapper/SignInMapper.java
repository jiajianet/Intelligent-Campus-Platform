package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.SignIn;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface SignInMapper {

    SignIn getSignInById(Long signInId);

    List<SignIn> getAllSignIns();

    void insertSignIn(SignIn signIn);

    void updateSignIn(SignIn signIn);

    void deleteSignIn(Long signInId);

    void save(SignIn signIn);

    SignIn findById(@Param("signInId") Long signInId);

    void updateStatus(@Param("signInId") Long signInId, @Param("status") boolean status);
}