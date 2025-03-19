package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.ExamData;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface ExamDataMapper {

    ExamData getExamDataById(Long id);

    List<ExamData> getAllExamData();

    ExamData getExamDataByExamIdAndStudentId(Long examId, Long studentId);

    void insertExamData(ExamData examData);

    void updateExamData(ExamData examData);

    void deleteExamData(Long id);

    ExamData findByExamIdAndStudentId(@Param("examId") Long examId, @Param("studentId") Long studentId);

    void save(ExamData examData);
}