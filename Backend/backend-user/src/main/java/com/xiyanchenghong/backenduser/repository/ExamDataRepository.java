package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.ExamData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamDataRepository extends JpaRepository<ExamData, Long> {
    ExamData findByExamIdAndStudentId(Long examId, Long studentId);
}