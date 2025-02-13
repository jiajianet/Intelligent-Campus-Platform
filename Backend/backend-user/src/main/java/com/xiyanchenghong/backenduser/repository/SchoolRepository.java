package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchoolRepository extends JpaRepository<School, Long> {
    List<School> findByNameContaining(String school);
    School findByName(String name);
}
