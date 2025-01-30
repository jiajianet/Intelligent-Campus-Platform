package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.ExamData;
import com.xiyanchenghong.backenduser.repository.ExamDataRepository;
import com.xiyanchenghong.backenduser.service.ExamDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamDataServiceImpl implements ExamDataService {

    @Autowired
    private ExamDataRepository examDataRepository;

    @Override
    public ExamData getExamData(Long examId, Long studentId) {
        return examDataRepository.findByExamIdAndStudentId(examId, studentId);
    }

    @Override
    public void updateExamData(ExamData examData) {
        examDataRepository.save(examData);
    }


}