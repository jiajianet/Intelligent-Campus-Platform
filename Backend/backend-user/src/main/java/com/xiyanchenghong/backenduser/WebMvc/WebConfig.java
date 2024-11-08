package com.xiyanchenghong.backenduser.WebMvc;
import com.xiyanchenghong.backenduser.WebMvc.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public OncePerRequestFilter jwtFilter() {
        return new JwtFilter();
    }
}
