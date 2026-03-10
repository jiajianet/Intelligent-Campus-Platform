package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.AssignmentData;
import org.apache.ibatis.annotations.*;

import java.util.List;
@Mapper
public interface AssignmentDataMapper {

    AssignmentData getAssignmentDataById(Long id);

    List<AssignmentData> getAllAssignmentData();

    AssignmentData findByAssignmentIdAndStudentId(Long assignmentId, Long studentId);

    void insertAssignmentData(AssignmentData assignmentData);

    void updateAssignmentData(AssignmentData assignmentData);

    void deleteAssignmentData(Long id);
}