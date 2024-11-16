package com.xiyanchenghong.backenduser.config;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public JwtUtils jwtUtils() {
        return new JwtUtils();
    }
}

