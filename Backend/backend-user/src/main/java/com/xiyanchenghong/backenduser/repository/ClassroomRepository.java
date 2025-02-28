package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    Classroom findByTeacherId(Long teacherId);
    List<Classroom> findByEndTimeIsNull();
    List<Classroom> findByTeacherIdAndEndTimeIsNull(Long teacherId);
}