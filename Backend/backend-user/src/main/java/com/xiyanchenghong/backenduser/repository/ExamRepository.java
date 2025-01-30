package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.Exam;
import com.xiyanchenghong.backenduser.domain.ExamData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    boolean existsByIdAndTeacherId(Long id, Long teacherId);
    Exam findByIdAndTeacherId(Long id, Long teacherId);
}