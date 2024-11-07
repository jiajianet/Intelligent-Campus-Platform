package com.xiyanchenghong.backenduser.config;


import com.xiyanchenghong.backenduser.interceptor.UserInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/*
* 注册拦截器
* */
@Configuration //用于扫描？
public class UserConfig implements WebMvcConfigurer {
    @Autowired
    private UserInterceptor userInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(userInterceptor)
//                .addPathPatterns("/**")
//                .excludePathPatterns("/user/register")//添加一个拦截器来注册,拦截所有除了注册
//                .excludePathPatterns("/user/login")//登录不拦截，可以注册后直接登录
        ;
    }

}
