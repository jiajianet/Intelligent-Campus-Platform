package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.ExamSubmission;
import com.xiyanchenghong.backenduser.repository.ExamSubmissionRepository;
import com.xiyanchenghong.backenduser.service.ExamSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamSubmissionServiceImpl implements ExamSubmissionService {

    @Autowired
    private ExamSubmissionRepository examSubmissionRepository;

    @Override
    public void submitExam(ExamSubmission examSubmission) {
        examSubmissionRepository.save(examSubmission);
    }
}