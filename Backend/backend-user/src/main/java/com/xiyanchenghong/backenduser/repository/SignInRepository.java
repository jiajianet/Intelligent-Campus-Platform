package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.SignIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignInRepository extends JpaRepository<SignIn, Long> {
}