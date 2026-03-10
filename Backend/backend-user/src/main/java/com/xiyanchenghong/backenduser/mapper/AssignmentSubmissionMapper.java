package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.AssignmentSubmission;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface AssignmentSubmissionMapper {

    AssignmentSubmission getAssignmentSubmissionById(Long id);

    List<AssignmentSubmission> getAllAssignmentSubmissions();

    void insertAssignmentSubmission(AssignmentSubmission assignmentSubmission);

    void updateAssignmentSubmission(AssignmentSubmission assignmentSubmission);

    void deleteAssignmentSubmission(Long id);
}