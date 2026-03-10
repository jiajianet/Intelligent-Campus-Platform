package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.EmailVerificationToken;
import org.apache.ibatis.annotations.*;
@Mapper
public interface EmailVerificationTokenMapper {

    EmailVerificationToken getEmailVerificationTokenById(Long id);

    EmailVerificationToken getEmailVerificationTokenByToken(String token);

    void insertEmailVerificationToken(EmailVerificationToken emailVerificationToken);

    void updateEmailVerificationToken(EmailVerificationToken emailVerificationToken);

    void deleteEmailVerificationToken(Long id);

    void save(EmailVerificationToken token);

    EmailVerificationToken findByToken(@Param("token") String token);
}