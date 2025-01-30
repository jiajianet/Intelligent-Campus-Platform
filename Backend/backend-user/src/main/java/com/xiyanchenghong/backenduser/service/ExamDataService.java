package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.ExamData;

public interface ExamDataService {
    ExamData getExamData(Long examId, Long studentId);
    void updateExamData(ExamData examData);
}