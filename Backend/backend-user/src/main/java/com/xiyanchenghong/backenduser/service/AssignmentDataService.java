package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.AssignmentData;

public interface AssignmentDataService {
    AssignmentData getAssignmentData(Long assignmentId, Long studentId);
}