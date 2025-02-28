package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Classroom;
import com.xiyanchenghong.backenduser.domain.ClassroomStudent;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.repository.ClassroomRepository;
import com.xiyanchenghong.backenduser.repository.ClassroomStudentRepository;
import com.xiyanchenghong.backenduser.repository.UserRepository;
import com.xiyanchenghong.backenduser.service.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassroomServiceImpl implements ClassroomService {

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private ClassroomStudentRepository classroomStudentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Classroom getClassroomInfo(Long userId) {
        return classroomRepository.findByTeacherId(userId);
    }

    @Override
    public Classroom beginClassroom(Classroom classroom) {
        classroom.setStartTime(new Date());
        classroom.setEndTime(null);
        return classroomRepository.save(classroom);
    }

    @Override
    public Classroom endClassroom(Classroom classroom) {
        // 更新教室记录
        Classroom existingClassroom = classroomRepository.findById(classroom.getClassroomId()).orElse(null);
        if (existingClassroom != null) {
            existingClassroom.setEndTime(new Date());
            return classroomRepository.save(existingClassroom);
        }
        return null;
    }

    @Override
    public Classroom modifyClassroom(Classroom classroom) {
        // 修改教室记录
        Classroom existingClassroom = classroomRepository.findById(classroom.getClassroomId()).orElse(null);
        if (existingClassroom != null) {
            existingClassroom.setCourseId(classroom.getCourseId());
            existingClassroom.setClassroomName(classroom.getClassroomName());
            existingClassroom.setStartTime(classroom.getStartTime());
            existingClassroom.setEndTime(classroom.getEndTime());
            return classroomRepository.save(existingClassroom);
        }
        return null;
    }

    @Override
    public List<ClassroomStudent> getStudents(Long classroomId) {
        return classroomStudentRepository.findByClassroomId(classroomId);
    }

    @Override
    public ClassroomStudent joinClassroom(ClassroomStudent classroomStudent) {
        return classroomStudentRepository.save(classroomStudent);
    }

    @Override
    public List<Classroom> getOngoingClassrooms() {
        return classroomRepository.findByEndTimeIsNull();
    }

    @Override
    public List<Classroom> getOngoingClassroomsByTeacherId(Long teacherId) {
        return classroomRepository.findByTeacherIdAndEndTimeIsNull(teacherId);
    }

    @Override
    public List<Classroom> getOngoingClassroomsByStudentId(Long studentId) {
        return classroomStudentRepository.findOngoingClassroomsByStudentId(studentId);
    }

    @Override
    public void raiseHand(Long studentId) {
        // 更新学生的举手状态
        ClassroomStudent classroomStudent = classroomStudentRepository.findByStudentId(studentId);
        if (classroomStudent != null) {
            classroomStudent.setHandRaised(true);
            classroomStudentRepository.save(classroomStudent);
        }
    }

    @Override
    public List<User> getRaisedHands(Long classroomId) {
        List<ClassroomStudent> raisedHandStudents = classroomStudentRepository.findByClassroomIdAndHandRaisedTrue(classroomId);
        return raisedHandStudents.stream()
                .map(cs -> userRepository.findById(cs.getStudentId()).orElse(null))
                .collect(Collectors.toList());
    }
}