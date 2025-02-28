package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    Classroom findByTeacherId(Long teacherId);

    List<Classroom> findByEndTimeIsNull();
}