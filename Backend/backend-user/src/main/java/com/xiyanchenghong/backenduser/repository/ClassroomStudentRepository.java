package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.ClassroomStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClassroomStudentRepository extends JpaRepository<ClassroomStudent, Long> {
    List<ClassroomStudent> findByClassroomId(Long classroomId);
}