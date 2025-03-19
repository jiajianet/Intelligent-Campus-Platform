package com.xiyanchenghong.backenduser.mapper;
import com.xiyanchenghong.backenduser.domain.Assignment;
import org.apache.ibatis.annotations.*;

import java.util.List;
@Mapper
public interface AssignmentMapper {

    Assignment getAssignmentById(Long assignmentId);

    List<Assignment> getAllAssignments();

    void insertAssignment(Assignment assignment);

    void updateAssignment(Assignment assignment);

    void deleteAssignment(Long assignmentId);
}