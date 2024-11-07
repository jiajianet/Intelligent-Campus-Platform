package com.xiyanchenghong.backenduser.model;

import java.lang.annotation.*;
import java.util.concurrent.TimeUnit;

/**
 * @description 加上这个注解可以将参数设置为key
 * 请求密钥参数
 */
@Target({ElementType.METHOD, ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface RequestLock {
    String prefix() default "";
    String delimiter() default ":";
    long expire() default 5;
    TimeUnit timeUnit() default TimeUnit.SECONDS;
}

