package cn.xiyanchenghong.waimai.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages="cn.xiyanchenghong.waimai.bean.entity")
@EnableJpaRepositories(basePackages= "cn.xiyanchenghong.waimai.dao")
public class ServiceConfiguration {



    public static void main(String[] args) {
        SpringApplication.run(ServiceConfiguration.class);
    }
}
