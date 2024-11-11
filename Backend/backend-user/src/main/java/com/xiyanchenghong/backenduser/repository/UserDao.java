package com.xiyanchenghong.backenduser.repository;
import com.xiyanchenghong.backenduser.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.Mapping;

@Repository
public interface  UserDao extends JpaRepository<User, Long> {


    //通过用户名uname查找用户，注意要按照JPA的格式使用驼峰命名法
    User findByUno(String uno);


    //通过用户名uname和密码查找用户
    User findByUnoAndPassword(String uno, String password);

    User findByUname(String uname);
}
