package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.Date;

@Getter
@Setter
public class EmailVerificationToken {
    private Long id;
    private String token;
    private Long userId;
    private Date expiryDate;

    //使用 ZonedDateTime设置到期日期的方法
    public void setExpiryDateWithZone(ZonedDateTime expiryDateTime) {
        this.expiryDate = Date.from(expiryDateTime.toInstant());
    }
}