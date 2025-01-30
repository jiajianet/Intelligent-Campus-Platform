package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUnoAndEmail(String uno, String email);
    void deleteByUno(String uno);
}