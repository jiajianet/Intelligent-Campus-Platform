package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.AssignmentSubmission;
import com.xiyanchenghong.backenduser.mapper.AssignmentSubmissionMapper;
import com.xiyanchenghong.backenduser.service.AssignmentSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentSubmissionServiceImpl implements AssignmentSubmissionService {

    @Autowired
    private AssignmentSubmissionMapper assignmentSubmissionMapper;

    @Override
    public void submitAssignment(AssignmentSubmission submission) {
        assignmentSubmissionMapper.insertAssignmentSubmission(submission);
    }
}