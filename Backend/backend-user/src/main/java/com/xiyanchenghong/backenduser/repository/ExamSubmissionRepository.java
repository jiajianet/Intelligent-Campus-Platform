package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.ExamSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamSubmissionRepository extends JpaRepository<ExamSubmission, Long> {
}