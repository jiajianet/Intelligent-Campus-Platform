package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.Classroom;
import com.xiyanchenghong.backenduser.domain.ClassroomStudent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassroomStudentRepository extends JpaRepository<ClassroomStudent, Long> {
    List<ClassroomStudent> findByClassroomId(Long classroomId);
    ClassroomStudent findByStudentId(Long studentId);
    List<ClassroomStudent> findByClassroomIdAndHandRaisedTrue(Long classroomId);
    List<Classroom> findOngoingClassroomsByStudentId(Long studentId);
}