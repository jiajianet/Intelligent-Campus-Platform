package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.ExamSubmission;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface ExamSubmissionMapper {

    ExamSubmission getExamSubmissionById(Long id);

    List<ExamSubmission> getAllExamSubmissions();

    void insertExamSubmission(ExamSubmission examSubmission);

    void updateExamSubmission(ExamSubmission examSubmission);

    void deleteExamSubmission(Long id);

    void save(ExamSubmission examSubmission);
}