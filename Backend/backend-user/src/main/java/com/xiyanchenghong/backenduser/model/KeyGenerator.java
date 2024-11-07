package com.xiyanchenghong.backenduser.model;

public class KeyGenerator {

    public void generateKey(@RequestLock String uno, @RequestLock String password) {
        // 生成key的逻辑
        String key = uno + ":" + password;
        System.out.println("Generated Key: " + key);
    }
}