package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.AssignmentSubmission;
import com.xiyanchenghong.backenduser.repository.AssignmentSubmissionRepository;
import com.xiyanchenghong.backenduser.service.AssignmentSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentSubmissionServiceImpl implements AssignmentSubmissionService {

    @Autowired
    private AssignmentSubmissionRepository assignmentSubmissionRepository;

    @Override
    public void submitAssignment(AssignmentSubmission submission) {
        assignmentSubmissionRepository.save(submission);
    }
}