package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Exam;
import com.xiyanchenghong.backenduser.mapper.ExamMapper;
import com.xiyanchenghong.backenduser.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamServiceImpl implements ExamService {

    @Autowired
    private ExamMapper examMapper;

    @Override
    public void addExam(Exam exam) {
        examMapper.save(exam);
    }

    @Override
    public boolean deleteExam(Long examId, Long teacherId) {
        // 先检查考试是否存在并且属于该教师
        if (examMapper.existsByIdAndTeacherId(examId, teacherId)) {
            examMapper.deleteByIdAndTeacherId(examId, teacherId);
            return true;
        }
        return false;
    }

    @Override
    public void saveExam(Exam exam) {
        examMapper.save(exam);
    }

    @Override
    public Exam getExamByIdAndTeacherId(Long examId, Long teacherId) {
        return examMapper.findByIdAndTeacherId(examId, teacherId);
    }

    @Override
    public Exam getExamById(Long examId) {
        return examMapper.findById(examId);
    }
}