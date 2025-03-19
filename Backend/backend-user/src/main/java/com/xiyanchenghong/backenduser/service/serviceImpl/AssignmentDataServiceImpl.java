package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.AssignmentData;
import com.xiyanchenghong.backenduser.mapper.AssignmentDataMapper;
import com.xiyanchenghong.backenduser.service.AssignmentDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentDataServiceImpl implements AssignmentDataService {

    @Autowired
    private AssignmentDataMapper assignmentDataMapper;

    @Override
    public AssignmentData getAssignmentData(Long assignmentId, Long studentId) {
        return assignmentDataMapper.findByAssignmentIdAndStudentId(assignmentId, studentId);
    }
}