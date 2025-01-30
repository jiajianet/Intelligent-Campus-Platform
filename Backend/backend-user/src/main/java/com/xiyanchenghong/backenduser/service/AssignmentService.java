package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.Assignment;

public interface AssignmentService {
    void addAssignment(Assignment assignment);
    void deleteAssignment(Long assignmentId, Long teacherId);
    void modifyAssignment(Assignment assignment);
    Assignment getAssignmentInfo(Long assignmentId);

}