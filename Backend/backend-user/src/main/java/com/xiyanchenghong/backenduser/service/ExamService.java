package com.xiyanchenghong.backenduser.service;

import com.xiyanchenghong.backenduser.domain.Exam;

public interface ExamService {
    void addExam(Exam exam);
    boolean deleteExam(Long examId, Long teacherId);
    Exam getExamByIdAndTeacherId(Long examId, Long teacherId);
    void saveExam(Exam exam);
    Exam getExamById(Long examId);
}