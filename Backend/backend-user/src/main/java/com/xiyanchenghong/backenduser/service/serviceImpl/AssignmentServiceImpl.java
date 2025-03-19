package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Assignment;
import com.xiyanchenghong.backenduser.mapper.AssignmentMapper;
import com.xiyanchenghong.backenduser.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    @Autowired
    private AssignmentMapper assignmentMapper;

    @Override
    public void addAssignment(Assignment assignment) {
        assignmentMapper.insertAssignment(assignment);
    }

    @Override
    public void deleteAssignment(Long assignmentId, Long teacherId) {
        Assignment assignment = assignmentMapper.getAssignmentById(assignmentId);
        if (assignment != null && assignment.getTeacherId().equals(teacherId)) {
            assignmentMapper.deleteAssignment(assignmentId);
        }
    }

    @Override
    public void modifyAssignment(Assignment assignment) {
        Assignment existingAssignment = assignmentMapper.getAssignmentById(assignment.getAssignmentId());
        if (existingAssignment != null && existingAssignment.getTeacherId().equals(assignment.getTeacherId())) {
            existingAssignment.setTitle(assignment.getTitle());
            existingAssignment.setDescription(assignment.getDescription());
            existingAssignment.setDueDate(assignment.getDueDate());
            assignmentMapper.updateAssignment(existingAssignment);
        }
    }

    @Override
    public Assignment getAssignmentInfo(Long assignmentId) {
        return assignmentMapper.getAssignmentById(assignmentId);
    }
}