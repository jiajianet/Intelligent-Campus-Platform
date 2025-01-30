package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.AssignmentData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentDataRepository extends JpaRepository<AssignmentData, Long> {
    AssignmentData findByAssignmentIdAndStudentId(Long assignmentId, Long studentId);
}