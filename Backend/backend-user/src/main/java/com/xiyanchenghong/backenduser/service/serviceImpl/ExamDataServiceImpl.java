package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.ExamData;
import com.xiyanchenghong.backenduser.mapper.ExamDataMapper;
import com.xiyanchenghong.backenduser.service.ExamDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamDataServiceImpl implements ExamDataService {

    @Autowired
    private ExamDataMapper examDataMapper;

    @Override
    public ExamData getExamData(Long examId, Long studentId) {
        return examDataMapper.findByExamIdAndStudentId(examId, studentId);
    }

    @Override
    public void updateExamData(ExamData examData) {
        examDataMapper.save(examData);
    }
}