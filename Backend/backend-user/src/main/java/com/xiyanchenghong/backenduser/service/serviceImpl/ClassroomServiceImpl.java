package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Classroom;
import com.xiyanchenghong.backenduser.domain.ClassroomStudent;
import com.xiyanchenghong.backenduser.domain.User;
import com.xiyanchenghong.backenduser.mapper.ClassroomMapper;
import com.xiyanchenghong.backenduser.mapper.ClassroomStudentMapper;
import com.xiyanchenghong.backenduser.mapper.UserMapper;
import com.xiyanchenghong.backenduser.service.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassroomServiceImpl implements ClassroomService {

    @Autowired
    private ClassroomMapper classroomMapper;

    @Autowired
    private ClassroomStudentMapper classroomStudentMapper;

    @Autowired
    private UserMapper userMapper;

    @Override
    public Classroom getClassroomInfo(Long userId) {
        return classroomMapper.getClassroomByTeacherId(userId);
    }

    @Override
    public Classroom beginClassroom(Classroom classroom) {
        classroom.setStartTime(new Date());
        classroom.setEndTime(null);
        classroomMapper.insertClassroom(classroom);
        return classroom;
    }

    @Override
    public Classroom endClassroom(Classroom classroom) {
        // 更新教室记录
        Classroom existingClassroom = classroomMapper.getClassroomById(classroom.getClassroomId());
        if (existingClassroom != null) {
            existingClassroom.setEndTime(new Date());
            classroomMapper.updateClassroom(existingClassroom);
            return existingClassroom;
        }
        return null;
    }

    @Override
    public Classroom modifyClassroom(Classroom classroom) {
        // 修改教室记录
        Classroom existingClassroom = classroomMapper.getClassroomById(classroom.getClassroomId());
        if (existingClassroom != null) {
            existingClassroom.setCourseId(classroom.getCourseId());
            existingClassroom.setClassroomName(classroom.getClassroomName());
            existingClassroom.setStartTime(classroom.getStartTime());
            existingClassroom.setEndTime(classroom.getEndTime());
            classroomMapper.updateClassroom(existingClassroom);
            return existingClassroom;
        }
        return null;
    }

    @Override
    public List<ClassroomStudent> getStudents(Long classroomId) {
        return classroomStudentMapper.getStudentsByClassroomId(classroomId);
    }

    @Override
    public ClassroomStudent joinClassroom(ClassroomStudent classroomStudent) {
        classroomStudentMapper.insertClassroomStudent(classroomStudent);
        return classroomStudent;
    }

    @Override
    public List<Classroom> getOngoingClassrooms() {
        return classroomMapper.getOngoingClassrooms();
    }

    @Override
    public List<Classroom> getOngoingClassroomsByTeacherId(Long teacherId) {
        return classroomMapper.getOngoingClassroomsByTeacherId(teacherId);
    }

    @Override
    public List<Classroom> getOngoingClassroomsByStudentId(Long studentId) {
        return classroomStudentMapper.getOngoingClassroomsByStudentId(studentId);
    }

    @Override
    public void raiseHand(Long studentId) {
        // 更新学生的举手状态
        ClassroomStudent classroomStudent = classroomStudentMapper.getRaisedHandsByStudentId(studentId);
        if (classroomStudent != null) {
            classroomStudent.setHandRaised(true);
            classroomStudentMapper.updateClassroomStudentHandRaised(studentId, true);
        }
    }

    @Override
    public List<User> getRaisedHands(Long classroomId) {
        List<ClassroomStudent> raisedHandStudents = classroomStudentMapper.getStudentsByClassroomIdAndHandRaisedTrue(classroomId);
        return raisedHandStudents.stream()
                .map(cs -> userMapper.getUserById(cs.getStudentId()))
                .collect(Collectors.toList());
    }
}