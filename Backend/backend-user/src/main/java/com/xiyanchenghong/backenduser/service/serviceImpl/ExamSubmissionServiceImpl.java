package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.ExamSubmission;
import com.xiyanchenghong.backenduser.mapper.ExamSubmissionMapper;
import com.xiyanchenghong.backenduser.service.ExamSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamSubmissionServiceImpl implements ExamSubmissionService {

    @Autowired
    private ExamSubmissionMapper examSubmissionMapper;

    @Override
    public void submitExam(ExamSubmission examSubmission) {
        examSubmissionMapper.save(examSubmission);
    }
}