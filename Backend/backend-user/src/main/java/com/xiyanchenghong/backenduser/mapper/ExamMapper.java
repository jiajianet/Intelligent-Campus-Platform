package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.Exam;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface ExamMapper {

    Exam getExamById(Long id);

    List<Exam> getAllExams();

    Exam getExamByIdAndTeacherId(Long id, Long teacherId);

    void insertExam(Exam exam);

    void updateExam(Exam exam);

    void deleteExam(Long id);

    void save(Exam exam);

    void deleteByIdAndTeacherId(@Param("examId") Long examId, @Param("teacherId") Long teacherId);

    Exam findByIdAndTeacherId(@Param("examId") Long examId, @Param("teacherId") Long teacherId);

    Exam findById(@Param("examId") Long examId);

    boolean existsByIdAndTeacherId(@Param("examId") Long examId, @Param("teacherId") Long teacherId);
}