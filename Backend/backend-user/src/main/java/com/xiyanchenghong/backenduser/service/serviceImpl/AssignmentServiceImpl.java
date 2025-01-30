package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Assignment;
import com.xiyanchenghong.backenduser.repository.AssignmentRepository;
import com.xiyanchenghong.backenduser.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Override
    public void addAssignment(Assignment assignment) {
        assignmentRepository.save(assignment);
    }

    @Override
    public void deleteAssignment(Long assignmentId, Long teacherId) {
        Assignment assignment = assignmentRepository.findById(assignmentId).orElse(null);
        if (assignment != null && assignment.getTeacherId().equals(teacherId)) {
            assignmentRepository.delete(assignment);
        }
    }

    @Override
    public void modifyAssignment(Assignment assignment) {
        Assignment existingAssignment = assignmentRepository.findById(assignment.getAssignmentId()).orElse(null);
        //通过 assignmentId 查找作业。如果找不到，assignment 为 null。
        if (existingAssignment != null && existingAssignment.getTeacherId().equals(assignment.getTeacherId())) {
            existingAssignment.setTitle(assignment.getTitle());
            existingAssignment.setDescription(assignment.getDescription());
            existingAssignment.setDueDate(assignment.getDueDate());
            assignmentRepository.save(existingAssignment);
        }
    }

    @Override
    public Assignment getAssignmentInfo(Long assignmentId) {
        return assignmentRepository.findById(assignmentId).orElse(null);
    }
}