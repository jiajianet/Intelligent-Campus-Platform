package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.PasswordResetToken;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface PasswordResetTokenMapper {

    PasswordResetToken getPasswordResetTokenById(Long id);

    List<PasswordResetToken> getAllPasswordResetTokens();

    PasswordResetToken getPasswordResetTokenByToken(String token);

    void insertPasswordResetToken(PasswordResetToken passwordResetToken);

    void updatePasswordResetToken(PasswordResetToken passwordResetToken);

    void deletePasswordResetToken(Long id);

    void save(PasswordResetToken token);

    PasswordResetToken findByToken(@Param("token") String token);
}