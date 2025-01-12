package cn.xiyanchenghong.waimai.dao;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@Configuration
@EnableJpaRepositories("cn.xiyanchenghong.waimai.dao")
public class DaoConfiguration {
}
