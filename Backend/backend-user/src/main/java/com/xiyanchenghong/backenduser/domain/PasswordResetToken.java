package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

import java.time.ZoneOffset;
import java.util.Date;
import java.time.ZonedDateTime;

@Getter
@Setter
public class PasswordResetToken {
    private Long id;
    private String token;
    private Long userId;
    private Date expiryDate;
    private ZonedDateTime expiryDateWithZone;

    /**
     * 使用 ZonedDateTime 实例设置到期日期
     * 此方法将 ZonedDateTime 转换为 Date 并将其设置为 expiryDate，同时将 expiryDateWithZone 设置为该 ZonedDateTime
     *
     * @param expiryDateTime 要设置为到期日期的 ZonedDateTime 实例
     */
    public void setExpiryDateWithZone(ZonedDateTime expiryDateTime) {
        this.expiryDate = Date.from(expiryDateTime.toInstant());
        this.expiryDateWithZone = expiryDateTime.withZoneSameInstant(ZoneOffset.UTC);
    }
}