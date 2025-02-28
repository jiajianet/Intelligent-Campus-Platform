package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.CourseStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseStudentRepository extends JpaRepository<CourseStudent, Long> {
    List<CourseStudent> findByStudentId(Long studentId);
    List<CourseStudent> findByCourse_CourseId(Long courseId);
    CourseStudent findByStudentIdAndCourse_CourseId(Long studentId, Long courseId);
}