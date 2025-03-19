package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.User;
import org.apache.ibatis.annotations.*;
import java.util.List;
import java.util.Optional;
@Mapper
public interface UserMapper {

    User getUserById(Long uid);

    List<User> getAllUsers();

    User getUserByUnoAndEmail(@Param("uno") String uno, @Param("email") String email);

    User getUserByUno(String uno);

    User getUserByUnoAndPassword(@Param("uno") String uno, @Param("password") String password);

    User getUserByUname(String uname);

    List<User> getUsersByEmail(String email);

    void insertUser(User user);

    void updateUser(User user);

    void deleteUserByUno(String uno);

    void deleteUserById(Long uid);

    Optional<User> findById(@Param("uid") Long uid);

    List<User> findByEmail(@Param("email") String email);

    void delete(User user);

    User findByUno(@Param("uno") String uno);

    void save(User user);

    User findByUnoAndEmail(@Param("uno") String uno, @Param("email") String email);
}