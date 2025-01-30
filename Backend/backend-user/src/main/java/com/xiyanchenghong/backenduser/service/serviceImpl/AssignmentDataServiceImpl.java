package com.xiyanchenghong.backenduser.service.serviceImpl;
import com.xiyanchenghong.backenduser.domain.AssignmentData;
import com.xiyanchenghong.backenduser.repository.AssignmentDataRepository;
import com.xiyanchenghong.backenduser.service.AssignmentDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentDataServiceImpl implements AssignmentDataService {

    @Autowired
    private AssignmentDataRepository assignmentDataRepository;

    @Override
    public AssignmentData getAssignmentData(Long assignmentId, Long studentId) {
        return assignmentDataRepository.findByAssignmentIdAndStudentId(assignmentId, studentId);
    }
}