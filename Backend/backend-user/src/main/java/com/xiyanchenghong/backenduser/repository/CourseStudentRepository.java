package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.CourseStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseStudentRepository extends JpaRepository<CourseStudent, Long> {
    CourseStudent findByStudentIdAndCourseId(Long studentId, Long courseId);
}