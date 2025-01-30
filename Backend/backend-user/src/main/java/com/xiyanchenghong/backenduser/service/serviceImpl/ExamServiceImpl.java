package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Exam;
import com.xiyanchenghong.backenduser.repository.ExamRepository;
import com.xiyanchenghong.backenduser.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamServiceImpl implements ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Override
    public void addExam(Exam exam) {
        examRepository.save(exam);
    }

    @Override
    public boolean deleteExam(Long examId, Long teacherId) {
        // 先检查考试是否存在并且属于该教师
        if (examRepository.existsByIdAndTeacherId(examId, teacherId)) {
            examRepository.deleteById(examId);
            return true;
        }
        return false;
    }

    @Override
    public void saveExam(Exam exam) {
        examRepository.save(exam);
    }

    @Override
    public Exam getExamByIdAndTeacherId(Long examId, Long teacherId) {
        return examRepository.findByIdAndTeacherId(examId, teacherId);
    }

    @Override
    public Exam getExamById(Long examId) {
        return examRepository.findById(examId).orElse(null);
    }
}