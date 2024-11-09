package com.xiyanchenghong.backenduser.service;

public interface CaptchaCacheService {
    void set(String key, String value, long expiresInSeconds);
    boolean exists(String key);
    void delete(String key);
    String get(String key);
    Long increment(String key, long val);
    void setExpire(String key, long expiresInSeconds);
    String type();
}


